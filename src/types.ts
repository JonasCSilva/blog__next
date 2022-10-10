import { ResponsiveImageType, StructuredTextDocument } from 'react-datocms'

export type Post = {
  title: string
  slug: string
  excerpt: string
  date: string
  content: StructuredTextDocument
  coverImage?: {
    responsiveImage: ResponsiveImageType
  }
  author: { name: string }
}
