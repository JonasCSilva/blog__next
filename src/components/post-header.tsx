import Date from "./date";
import CoverImage from "./cover-image";

export default function PostHeader({ title, coverImage, date, author }: any) {
  return (
    <>
      <h1>{title}</h1>
      <div className="hidden md:block md:mb-12">
        <h1>{author.name}</h1>
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <h1>{author.name}</h1>
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
