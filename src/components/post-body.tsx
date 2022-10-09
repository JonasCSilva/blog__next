/* eslint-disable react/no-unescaped-entities */
import { StructuredText, Image } from 'react-datocms'

export default function PostBody({ content }: any) {
  return (
    <div>
      <StructuredText
        data={content}
        renderBlock={({ record }: any) => {
          if (record.__typename === 'ImageBlockRecord') {
            // eslint-disable-next-line jsx-a11y/alt-text
            return <Image data={record.image.responsiveImage} />
          }

          return (
            <>
              <p>Don't know how to render a block!</p>
              <pre>{JSON.stringify(record, null, 2)}</pre>
            </>
          )
        }}
      />
    </div>
  )
}
