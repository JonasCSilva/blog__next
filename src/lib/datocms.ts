import tiny from 'tiny-json-http'

type Props = {
  query: string
  variables?: {
    slug: string
  }
}

export async function request<T>({ query, variables }: Props): Promise<T> {
  const { body } = await tiny.post({
    url: 'https://graphql.datocms.com',
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`
    },
    data: {
      query,
      variables
    }
  })

  if (body.errors) {
    console.error('The query has some errors!')
    throw body.errors
  }

  return body.data
}
