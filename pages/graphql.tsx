import { FunctionComponent } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '@/lib/graphql/apollo'
import { ViewerDocument } from '@/lib/graphql/viewer.graphql'
import { initializeApollo } from '@/lib/graphql/apollo'
import Example from '@/components/graphql/Example'

const GraphqlPage: FunctionComponent<{ initialApolloState }> = ({
  initialApolloState,
}) => {
  const apolloClient = useApollo(initialApolloState)

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <h3 className='text-center'>
          graphql example with local /api/graphql route.
        </h3>
        <Example />
      </ApolloProvider>
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default GraphqlPage
