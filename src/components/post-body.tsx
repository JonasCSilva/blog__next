/* eslint-disable react/no-unescaped-entities */
import { useCallback } from 'react'
import { StructuredText, Image, StructuredTextDocument, RenderBlockContext } from 'react-datocms'

export default function PostBody({ content }: { content: StructuredTextDocument }) {
  const renderBlock = useCallback(({ record }: RenderBlockContext<any>) => {
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
  }, [])

  return <StructuredText data={content} renderBlock={renderBlock} />
}
