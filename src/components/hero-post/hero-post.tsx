import Link from 'next/link'

import { Post } from '../../types'
import CoverImage from '../cover-image'
import Date from '../date'
import styles from './hero-post.module.scss'

export default function HeroPost({ title, coverImage, date, excerpt, author, slug }: Post) {
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
