import Link from "next/link";
import CoverImage from "./cover-image";
import Date from "./date";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: any) {
  return (
    <section>
      <div>
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
          slug={slug}
        />
      </div>
      <div>
        <div>
          <h3>
            <Link href={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
          </h3>
          <div>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
          <h1>{author.name}</h1>
        </div>
      </div>
    </section>
  );
}
