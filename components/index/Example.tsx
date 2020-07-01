import { FunctionComponent } from 'react'
import { useViewerQuery } from '@/lib/graphql/viewer.graphql'
import { usePostsQuery } from '@/lib/graphql/post.graphql'

const Example: FunctionComponent = () => {
  const { data: viewerData } = useViewerQuery()
  const { viewer } = viewerData!
  const { data: postsData } = usePostsQuery()
  const { posts } = postsData!
  console.log(posts)

  return (
    <>
      <h3>
        You're signed in as id: {viewer.id} - {viewer.name}
      </h3>
      <p>Initial fetch at server side(ssr). (Note: You're {viewer.status}).</p>
      {/* <div>
        {post.id} - {post.title}
      </div> */}
    </>
  )
}

export default Example
