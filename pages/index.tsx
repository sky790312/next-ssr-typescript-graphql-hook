import { FunctionComponent } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '@/lib/graphql/apollo'
import { UsersDocument, MeDocument } from '@/lib/graphql/uesr.graphql'
import { PostsDocument } from '@/lib/graphql/post.graphql'
import { initializeApollo } from '@/lib/graphql/apollo'
import PostsSection from '@/components/index/PostsSection'

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
        <PostsSection />
      </ApolloProvider>
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await Promise.all([
    apolloClient.query({
      query: MeDocument,
    }),
    apolloClient.query({
      query: UsersDocument,
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
