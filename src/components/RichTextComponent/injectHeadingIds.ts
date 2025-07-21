import { createHeadingIdGenerator } from './createHeadingIdGenerator'

import type { RichTextNode } from './RichTextComponent'

export const injectHeadingIds = (nodes: RichTextNode[]): RichTextNode[] => {
  const generateId = createHeadingIdGenerator()

  const walk = (nodeList: RichTextNode[]) => {
    nodeList.forEach((node) => {
      if (node.type === 'heading' && 'tag' in node) {
        const headingText =
          node.children
            ?.map((child) => (typeof child === 'object' && 'text' in child ? child.text : ''))
            .join(' ')
            .trim() || ''

        const id = generateId(headingText)
        
        ;(node as any).id = id
      }

      if ('children' in node && Array.isArray(node.children)) {
        walk(node.children)
      }
    })
  }

  // глибока копія, якщо треба уникнути мутацій оригіналу
  const cloned = JSON.parse(JSON.stringify(nodes))
  walk(cloned)
  return cloned
}
