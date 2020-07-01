import { FunctionComponent } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '@/lib/graphql/apollo'
import { ViewerDocument } from '@/lib/graphql/viewer.graphql'
import { PostsDocument } from '@/lib/graphql/post.graphql'
import { initializeApollo } from '@/lib/graphql/apollo'
import Example from '@/components/index/Example'

const IndexPage: FunctionComponent<{ initialApolloState }> = ({
  initialApolloState,
}) => {
  const apolloClient = useApollo(initialApolloState)

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <h1 className='text-center'>
          graphql example with local /api/graphql route.
        </h1>
        <Example />
      </ApolloProvider>
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await Promise.all([
    apolloClient.query({
      query: ViewerDocument,
    }),
    apolloClient.query({
      query: PostsDocument,
    }),
  ])

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default IndexPage
