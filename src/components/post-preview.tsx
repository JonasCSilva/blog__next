// import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import Date from "./date";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: any) {
  return (
    <div>
      <div>
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <h3>
        <Link href={`/posts/${slug}`}>
          <a>{title}</a>
        </Link>
      </h3>
      <div>
        <Date dateString={date} />
      </div>
      <p>{excerpt}</p>
      <h1> {author.name}</h1>
    </div>
  );
}
