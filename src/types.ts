import { ResponsiveImageType } from 'react-datocms'

export type Post = {
  title: string
  slug: string
  excerpt: string
  date: string
  coverImage: {
    responsiveImage: ResponsiveImageType
  }
  author: { name: string }
}
