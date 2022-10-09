import { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { DisabledQueryListenerOptions, useQuerySubscription } from 'react-datocms'
import { CgDarkMode } from 'react-icons/cg'

import CoverImage from '../../components/cover-image'
import Date from '../../components/date'
import MoreStories from '../../components/more-stories/more-stories'
import PostBody from '../../components/post-body'
import { request } from '../../lib/datocms'
import { postsQuery } from '../../lib/queries'
import styles from '../../styles/posts.module.scss'

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` })

  return {
    paths: data.allPosts.map(({ slug }: { slug: string }) => `/posts/${slug}`),
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const graphqlRequest = {
    query: postsQuery,
    variables: {
      slug: params.slug
    }
  }

  return {
    props: {
      subscription: {
        enabled: false,
        initialData: await request(graphqlRequest)
      }
    }
  }
}

type Props = {
  subscription: DisabledQueryListenerOptions<any, any>
}

const Post: NextPage<Props> = ({ subscription }) => {
  const {
    data: {
      post: { title, author, coverImage, date, content },
      morePosts
    }
  } = useQuerySubscription(subscription)
  const { theme, setTheme } = useTheme()

  return (
    <section className={styles.root}>
      <header>
        <h2>
          <Link href='/'>
            <a>Blog</a>
          </Link>
          .
        </h2>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <CgDarkMode size='3rem' />
        </button>
      </header>
      <article>
        <header>
          <h1>{title}</h1>
          <h3>{author.name}</h3>
          <CoverImage title={title} responsiveImage={coverImage.responsiveImage} />
          <div>
            <Date dateString={date} />
          </div>
        </header>
        <main>
          <PostBody content={content} />
        </main>
      </article>
      <hr />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </section>
  )
}

export default Post
