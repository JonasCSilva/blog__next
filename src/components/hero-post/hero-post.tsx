import Link from 'next/link'
import { ResponsiveImageType } from 'react-datocms'

import CoverImage from '../cover-image'
import Date from '../date'
import styles from './hero-post.module.scss'

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

export default function HeroPost({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <section className={styles.root}>
      <CoverImage title={title} responsiveImage={coverImage.responsiveImage} slug={slug} />
      <main>
        <div>
          <h3>
            <Link href={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
          </h3>
          <Date dateString={date} />
        </div>
        <div>
          <p>{excerpt}</p>
          <h1>{author.name}</h1>
        </div>
      </main>
    </section>
  )
}
