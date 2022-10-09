import Link from 'next/link'
import { Image, ResponsiveImageType } from 'react-datocms'

type Props = {
  title: string
  responsiveImage: ResponsiveImageType
  slug?: string
}

export default function CoverImage({ title, responsiveImage, slug }: Props) {
  const image = (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${title}`
      }}
    />
  )

  return (
    <div>
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
