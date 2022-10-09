import type { NextPage } from "next";
import { useQuerySubscription } from "react-datocms";
import { responsiveImageFragment } from "../lib/fragments";
import { request } from "../lib/datocms";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import styles from "../styles/home.module.scss";
import { CgDarkMode } from "react-icons/cg";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Blog.</h1>
        <button className={styles.button} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <CgDarkMode size="3rem" />
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
  );
};

export default Home;
