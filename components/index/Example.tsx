import { FunctionComponent } from 'react'
import { useUsersQuery, useMeQuery } from '@/lib/graphql/uesr.graphql'
import { usePostsQuery } from '@/lib/graphql/post.graphql'

const Example: FunctionComponent = () => {
  const { data: usersData } = useUsersQuery()
  const { users } = usersData!
  const { data: postsData } = usePostsQuery()
  const { posts } = postsData!
  const { data: meData } = useMeQuery()
  const { me } = meData!
  console.log(me)
  console.log(users)
  console.log(posts)

  return (
    <>
      {/* <h3>
        You're signed in as id: {viewer.id} - {viewer.name}
      </h3>
      <p>Initial fetch at server side(ssr). (Note: You're {viewer.status}).</p> */}
      {/* <div>
        {post.id} - {post.title}
      </div> */}
    </>
  )
}

export default Example
