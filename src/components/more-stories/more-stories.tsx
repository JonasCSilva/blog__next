import Link from 'next/link'

import { Post } from '../../types'
import CoverImage from '../cover-image'
import Date from '../date'
import styles from './more-stories.module.scss'

type Props = { posts: Post[] }

export default function MoreStories({ posts }: Props) {
  return (
    <section className={styles.root}>
      <h2>More Stories</h2>
      <main>
        {posts.map(({ slug, title, coverImage, date, excerpt, author }: Post, index) => (
          <section key={index}>
            {coverImage && <CoverImage slug={slug} title={title} responsiveImage={coverImage.responsiveImage} />}
            <h3>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
            </h3>
            <Date dateString={date} />
            <p>{excerpt}</p>
            <h1>{author.name}</h1>
          </section>
        ))}
      </main>
    </section>
  )
}
