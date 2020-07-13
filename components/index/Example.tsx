import { FunctionComponent } from 'react'
import { useUsersQuery, useMeQuery } from '@/lib/graphql/uesr.graphql'
import { usePostsQuery } from '@/lib/graphql/post.graphql'
import CurrentPostModal from '@/components/index/CurrentPostModal'
import Post from '@/components/index/Post'
import { useState, useCallback } from 'react'
import { PostSchema } from '@/data/posts'

const Example: FunctionComponent = () => {
  const { data: usersData } = useUsersQuery()
  const { users } = usersData!
  const { data: postsData } = usePostsQuery()
  const { posts } = postsData!
  const { data: meData } = useMeQuery()
  const { me } = meData!
  const [shouldPostModalShow, setShouldPostModalShow] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<PostSchema | null>(null)

  const onPostClick = useCallback(post => {
    setCurrentPost(post)
    setShouldPostModalShow(true)
  }, [])

  const onPostModalClose = () => {
    setCurrentPost(null)
    setShouldPostModalShow(false)
  }

  // console.log(me)
  console.log(users)
  console.log(posts)

  return (
    <>
      <h3>
        You're signed in as id: {me.id} - {me.name}
      </h3>
      <p>Initial fetch at server side(ssr). (Note: You're {me.status}).</p>
      {posts.map(post => (
        <Post key={post.id} post={post} onPostClick={onPostClick} />
      ))}
      <CurrentPostModal
        shouldShow={shouldPostModalShow}
        onClose={onPostModalClose}
        currentPost={currentPost}
      />
    </>
  )
}

export default Example
