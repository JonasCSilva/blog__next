import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { useQuerySubscription } from 'react-datocms'
import { CgDarkMode } from 'react-icons/cg'

import HeroPost from '../components/hero-post/hero-post'
import MoreStories from '../components/more-stories/more-stories'
import { request } from '../lib/datocms'
import { responsiveImageFragment } from '../lib/fragments'
import styles from '../styles/index.module.scss'

export async function getStaticProps() {
  const graphqlRequest = {
    query: `
      {
        allPosts(orderBy: date_DESC, first: 20) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
          }
        }
      }
      ${responsiveImageFragment}
    `
  }

  return {
    props: {
      subscription: {
        enabled: false,
        initialData: await request(graphqlRequest as any)
      }
    }
  }
}

const Index: NextPage = ({ subscription }: any) => {
  const {
    data: { allPosts }
  } = useQuerySubscription(subscription)
  const { theme, setTheme } = useTheme()

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

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
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </div>
    </>
  )
}

export default Index
