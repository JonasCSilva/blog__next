import Link from 'next/link'
import { ResponsiveImageType } from 'react-datocms'

import CoverImage from '../cover-image'
import Date from '../date'
import styles from './post-preview.module.scss'

type Props = {
  title: string
  coverImage: {
    responsiveImage: ResponsiveImageType
  }
  date: string
  excerpt: string
  author: { name: string }
  slug: string
}

export default function PostPreview({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <div className={styles.root}>
      <CoverImage slug={slug} title={title} responsiveImage={coverImage.responsiveImage} />
      <h3>
        <Link href={`/posts/${slug}`}>
          <a>{title}</a>
        </Link>
      </h3>
      <Date dateString={date} />
      <p>{excerpt}</p>
      <h1>{author.name}</h1>
    </div>
  )
}
