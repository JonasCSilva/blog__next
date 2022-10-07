import type { NextPage } from "next";
import { useQuerySubscription } from "react-datocms";
import { responsiveImageFragment } from "../lib/fragments";
import { request } from "../lib/datocms";

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

  return <h1>Test</h1>;
};

export default Home;
