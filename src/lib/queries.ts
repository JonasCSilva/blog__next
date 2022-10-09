import { responsiveImageFragment } from './fragments'

export const postsQuery = `
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
`

export const indexQuery = `
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
