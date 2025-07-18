// import React from 'react'

// type Node = {
//   tag?: string
//   type?: string
//   children?: Node[]
//   text?: string
// }

// export type RichTextTextNode = {
//   type: 'text'
//   version: number
//   detail: number
//   format: number
//   mode: 'normal'
//   style: string
//   text: string
// }

// export type RichTextHeadingNode = {
//   type: 'heading'
//   version: number
//   tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//   direction: 'ltr' | 'rtl'
//   format: string
//   indent: number
//   children: RichTextTextNode[]
// }

// export type RichTextParagraphNode = {
//   type: 'paragraph'
//   version: number
//   direction: 'ltr' | 'rtl'
//   format: string
//   indent: number
//   textFormat: number
//   textStyle: string
//   children: RichTextTextNode[]
// }

// export type RichTextNode =
//   | RichTextTextNode
//   | RichTextHeadingNode
//   | RichTextParagraphNode
//   | {
//       type: string
//       [key: string]: any
//       children?: RichTextNode[]
//     }

// type Props = {
//   className: string
//   data: RichTextNode[]
// }

// const RichTextRenderer: React.FC<Props> = ({ className, data }) => {
//   const renderNodes = (nodes: RichTextNode[]): React.ReactNode => {
//     return nodes.map((node, index) => {
//       if (node.type === 'heading' && 'tag' in node) {
//         const text = node.children?.map((child) => child.text).join(' ') || ''
//         const id = text
//           .toLowerCase()
//           .replace(/\s+/g, '-')
//           .replace(/[^\w-]+/g, '')

//         return React.createElement(
//           node.tag,
//           { key: index, id },
//           node.children?.map((child, i) => <span key={i}>{child.text}</span>),
//         )
//       }

//       if (node.type === 'paragraph') {
//         return (
//           <p key={index}>
//             {node.children?.map((child, i) => (
//               <span key={i}>{child.text}</span>
//             ))}
//           </p>
//         )
//       }

//       if (node.type === 'text') {
//         return <span key={index}>{node.text}</span>
//       }

//       if (node.type === 'quote') {
//         console.log(node)
//         return <blockquote key={index}>{node.children[0].text}</blockquote>
//       }

//       if ('children' in node && Array.isArray(node.children)) {
//         return <div key={index}>{renderNodes(node.children)}</div>
//       }

//       return null
//     })
//   }

//   return <div className={className}>{renderNodes(data)}</div>
// }
// export default RichTextRenderer
