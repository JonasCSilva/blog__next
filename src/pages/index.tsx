import type { NextPage } from "next";
import { useQuerySubscription } from "react-datocms";
import { responsiveImageFragment } from "../lib/fragments";
import { request } from "../lib/datocms";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";

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
    `,
  };

  return {
    props: {
      subscription: {
        enabled: false,
        initialData: await request(graphqlRequest as any),
      },
    },
  };
}

const Home: NextPage = ({ subscription }: any) => {
  const {
    data: { allPosts },
  } = useQuerySubscription(subscription);

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
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
    </>
  );
};

export default Home;
