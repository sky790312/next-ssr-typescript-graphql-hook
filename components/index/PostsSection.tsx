import { FunctionComponent, useState, useCallback } from 'react'
import {
  useUsersQuery,
  useMeQuery,
  Post as PostSchema,
} from '@/lib/graphql/uesr.graphql'
import { usePostsQuery } from '@/lib/graphql/post.graphql'
import CurrentPostModal from '@/components/index/CurrentPostModal'
import Post from '@/components/index/Post'

const PostsSection: FunctionComponent = () => {
  const { data: usersData } = useUsersQuery()
  const users = usersData?.users
  const { data: postsData } = usePostsQuery()
  const posts = postsData?.posts
  const { data: meData } = useMeQuery()
  const me = meData?.me
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
        You&apos;re signed in as id: {me?.id} - {me?.name}
      </h3>
      <p>
        Initial fetch at server side(ssr). (Note: You&apos;re {me?.status}).
      </p>
      {posts?.map(post => (
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

export default PostsSection
