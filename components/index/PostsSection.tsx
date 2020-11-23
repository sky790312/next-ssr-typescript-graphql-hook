import { FunctionComponent, useState, useCallback } from 'react'
import {
  useUsersQuery,
  useMeQuery,
  Post as PostSchema,
} from '@/lib/graphql/user.graphql'
import { usePostsQuery } from '@/lib/graphql/post.graphql'
import { CurrentPostModal } from '@/components/index/CurrentPostModal'
import { ModifyNameModal } from '@/components/index/ModifyNameModal'
import { Post } from '@/components/index/Post'

export const PostsSection: FunctionComponent = () => {
  const { data: usersData } = useUsersQuery()
  const users = usersData?.users
  const { data: postsData } = usePostsQuery()
  const posts = postsData?.posts
  const { data: meData } = useMeQuery()
  const me = meData?.me
  const [shouldPostModalShow, setShouldPostModalShow] = useState<boolean>(false)
  const [shouldModifyNameModalShow, setShouldModifyNameModalShow] = useState<
    boolean
  >(false)
  const [currentPost, setCurrentPost] = useState<PostSchema | null>(null)

  const onModifyBtnClick = useCallback(() => {
    setShouldModifyNameModalShow(true)
  }, [])

  const onModifyNameModalClose = useCallback(() => {
    setShouldModifyNameModalShow(false)
  }, [])

  const onPostClick = useCallback(post => {
    setCurrentPost(post)
    setShouldPostModalShow(true)
  }, [])

  const onPostModalClose = useCallback(() => {
    setCurrentPost(null)
    setShouldPostModalShow(false)
  }, [])

  return (
    <>
      <h3>
        You&apos;re signed in as id: {me?.id} - {me?.name}
      </h3>
      <button onClick={onModifyBtnClick}>Modify your name</button>
      <p>
        Initial fetch at server side(ssr). (Note: You&apos;re {me?.status}).
      </p>
      <ModifyNameModal
        shouldShow={shouldModifyNameModalShow}
        onClose={onModifyNameModalClose}
      />
      <hr />
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
