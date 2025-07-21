import React from 'react'
import Image from 'next/image'

type Node = {
  tag?: string
  type?: string
  children?: Node[]
  text?: string
}

export type RichTextTextNode = {
  type: 'text'
  version: number
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
}

export type RichTextHeadingNode = {
  type: 'heading'
  version: number
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  direction: 'ltr' | 'rtl'
  format: string
  indent: number
  children: RichTextTextNode[]
}

export type RichTextParagraphNode = {
  type: 'paragraph'
  version: number
  direction: 'ltr' | 'rtl'
  format: string
  indent: number
  textFormat: number
  textStyle: string
  children: RichTextTextNode[]
}

export type RichTextNode =
  | RichTextTextNode
  | RichTextHeadingNode
  | RichTextParagraphNode
  | {
      type: string
      [key: string]: any
      children?: RichTextNode[]
    }

type Props = {
  className: string
  data: RichTextNode[]
}

const RichTextRenderer: React.FC<Props> = ({ className, data }) => {
  const renderNodes = (nodes: RichTextNode[]): React.ReactNode => {
    return nodes.map((node, index) => {
      if (node.type === 'heading' && 'tag' in node) {
        const id = 'id' in node ? node.id : undefined

        return React.createElement(
          node.tag,
          { key: index, id },
          node.children?.map((child, i) => (
            <span key={i}>{'text' in child ? child.text : null}</span>
          )),
        )
      }

      if (node.type === 'paragraph') {
        return (
          <p key={index}>
            {node.children?.map((child, i) =>
              child.type === 'text' ? <span key={i}>{child.text}</span> : null,
            )}
          </p>
        )
      }

      if (node.type === 'text') {
        return <span key={index}>{node.text}</span>
      }

      if (node.type === 'quote') {
        const firstChild = node.children?.[0]
        const quoteText = firstChild?.type === 'text' ? firstChild.text : ''

        return <blockquote key={index}>{quoteText}</blockquote>
      }

      if (node.type === 'list' && Array.isArray(node.children)) {
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul' // за замовчуванням ul

        return React.createElement(
          ListTag,
          { key: index },
          node.children.map((itemNode, itemIndex) =>
            itemNode.type === 'listitem' ? (
              <li key={itemIndex}>{renderNodes(itemNode.children || [])}</li>
            ) : null,
          ),
        )
      }

      if (node.type === 'upload' && node.relationTo === 'media') {
        const image = node.value
        if (!image || typeof image !== 'object') return null

        return (
          <Image
            key={index}
            src={image.url}
            alt={image.alt || ''}
            width={image.width}
            height={image.height}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )
      }

      if ('children' in node && Array.isArray(node.children)) {
        return <div key={index}>{renderNodes(node.children)}</div>
      }

      return null
    })
  }

  return <div className={className}>{renderNodes(data)}</div>
}
export default RichTextRenderer
