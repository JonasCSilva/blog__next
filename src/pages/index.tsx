import type { GetStaticProps, NextPage } from 'next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { CgDarkMode } from 'react-icons/cg'

import HeroPost from '../components/hero-post/hero-post'
import MoreStories from '../components/more-stories/more-stories'
import { request } from '../lib/datocms'
import { indexQuery } from '../lib/queries'
import styles from '../styles/index.module.scss'
import { Post } from '../types'

type Props = { initialData: { mainPost: Post; otherPosts: Post[] } }

export const getStaticProps: GetStaticProps<Props> = async () => {
  const result = await request<{ allPosts: Post[] }>({ query: indexQuery })

  return { props: { initialData: { mainPost: result.allPosts[0], otherPosts: result.allPosts.slice(1) } } }
}

const Index: NextPage<Props> = ({ initialData: { mainPost, otherPosts } }) => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Head>
        <title>Index Page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.root}>
        <header>
          <h1>Blog.</h1>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <CgDarkMode size='3rem' />
          </button>
        </header>
        {mainPost && (
          <HeroPost
            title={mainPost.title}
            coverImage={mainPost.coverImage}
            date={mainPost.date}
            author={mainPost.author}
            slug={mainPost.slug}
            excerpt={mainPost.excerpt}
          />
        )}
        {otherPosts.length > 0 && <MoreStories posts={otherPosts} />}
      </div>
    </>
  )
}

export default Index
