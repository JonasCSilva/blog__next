import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { CgDarkMode } from 'react-icons/cg'

import CoverImage from '../../components/cover-image'
import Date from '../../components/date'
import MoreStories from '../../components/more-stories/more-stories'
import PostBody from '../../components/post-body'
import { request } from '../../lib/datocms'
import { postsQuery } from '../../lib/queries'
import styles from '../../styles/posts.module.scss'
import { Post } from '../../types'

type Props = { initialData: { mainPost: Post; otherPosts: Post[] } }

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await request<{ allPosts: Post[] }>({ query: `{ allPosts { slug } }` })

  return {
    paths: data.allPosts.map(({ slug }: { slug: string }) => `/posts/${slug}`),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const graphqlRequest = {
    query: postsQuery,
    variables: {
      slug: params!.slug as string
    }
  }

  return { props: { initialData: await request(graphqlRequest) } }
}

const Posts: NextPage<Props> = ({
  initialData: {
    mainPost: { title, author, coverImage, date, content },
    otherPosts
  }
}) => {
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
          {coverImage && <CoverImage title={title} responsiveImage={coverImage.responsiveImage} />}
          <div>
            <Date dateString={date} />
          </div>
        </header>
        <main>
          <PostBody content={content} />
        </main>
      </article>
      <hr />
      {otherPosts.length > 0 && <MoreStories posts={otherPosts} />}
    </section>
  )
}

export default Posts
