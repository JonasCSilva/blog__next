import { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DisabledQueryListenerOptions, useQuerySubscription } from 'react-datocms'
import { CgDarkMode } from 'react-icons/cg'

import CoverImage from '../../components/cover-image'
import Date from '../../components/date'
import MoreStories from '../../components/more-stories/more-stories'
import PostBody from '../../components/post-body'
import { request } from '../../lib/datocms'
import { postsQuery } from '../../lib/queries'
import styles from '../../styles/posts.module.scss'
import { Post } from '../../types'

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
        initialData: await request(graphqlRequest)
      }
    }
  }
}

type Props = {
  subscription: DisabledQueryListenerOptions<{ post: Post; morePosts: Post[] }, never>
}

const Posts: NextPage<Props> = ({ subscription }) => {
  const { data } = useQuerySubscription(subscription)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [post, setPost] = useState<Post>(subscription!.initialData!.post)
  const [morePosts, setMorePosts] = useState<Post[]>(subscription!.initialData!.morePosts)

  useEffect(() => {
    setMounted(true)
    if (data) {
      setPost(data.post)
      setMorePosts(data.morePosts)
    }
  }, [data])

  if (!mounted) {
    return null
  }

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
          <h1>{post!.title}</h1>
          <h3>{post!.author.name}</h3>
          {post!.coverImage && <CoverImage title={post!.title} responsiveImage={post!.coverImage.responsiveImage} />}
          <div>
            <Date dateString={post!.date} />
          </div>
        </header>
        <main>
          <PostBody content={post!.content} />
        </main>
      </article>
      <hr />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </section>
  )
}

export default Posts
