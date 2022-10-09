import Link from 'next/link'
import { useQuerySubscription } from 'react-datocms'

import MoreStories from '../../components/more-stories'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import { request } from '../../lib/datocms'
import { responsiveImageFragment } from '../../lib/fragments'

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` } as any)

  return {
    paths: data.allPosts.map(({ slug }: { slug: string }) => `/posts/${slug}`),
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
        post(filter: {slug: {eq: $slug}}) {
          title
          slug
          content {
            value
            blocks {
              __typename
              ...on ImageBlockRecord {
                id
                image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
          date
          ogImage: coverImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
          }
        }
        morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
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
    `,
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

export default function Post({ subscription }: any) {
  const {
    data: { post, morePosts }
  } = useQuerySubscription(subscription)

  return (
    <div>
      <h2>
        <Link href='/'>
          <a>Blog.</a>
        </Link>
      </h2>
      <article>
        <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} />
        <PostBody content={post.content} />
      </article>
      <hr />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </div>
  )
}
