import PostPreview from "./post-preview";
import styles from "../styles/more-stories.module.scss";

export default function MoreStories({ posts }: any) {
  return (
    <section className={styles.root}>
      <h2>More Stories</h2>
      <main>
        {posts.map((post: any) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </main>
    </section>
  );
}
