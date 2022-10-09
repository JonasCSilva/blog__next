import Date from "./date";
import CoverImage from "./cover-image";
import { ResponsiveImageType } from "react-datocms";

type Props = {
  title: string;
  coverImage: { responsiveImage: ResponsiveImageType };
  date: string;
  author: { name: string };
};

export default function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <div>
        <h1>{author.name}</h1>
      </div>
      <div>
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <div>
        <Date dateString={date} />
      </div>
    </>
  );
}
