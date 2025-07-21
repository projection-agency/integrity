import { RichTextNode } from './RichTextComponent'
import { createHeadingIdGenerator } from './createHeadingIdGenerator'

export type HeadingLink = {
  id: string
  text: string
  level: number
}

export const extractHeadingsFromRichText = (nodes: RichTextNode[]): HeadingLink[] => {
  const generateId = createHeadingIdGenerator()
  const result: HeadingLink[] = []

  const walk = (nodeList: RichTextNode[]) => {
    nodeList.forEach((node) => {
      if (node.type === 'heading' && 'tag' in node) {
        const headingText =
          node.children
            ?.map((child) => (typeof child === 'object' && 'text' in child ? child.text : ''))
            .join(' ')
            .trim() || ''

        const id = generateId(headingText)
        const level = Number(node.tag.replace('h', ''))

        result.push({ id, text: headingText, level })
      }

      // рекурсивно проходимось по дочірніх вузлах
      if ('children' in node && Array.isArray(node.children)) {
        walk(node.children)
      }
    })
  }

  walk(nodes)
  return result
}
