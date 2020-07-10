import { FunctionComponent } from 'react'
import { useUsersQuery, useMeQuery } from '@/lib/graphql/uesr.graphql'
import { usePostsQuery } from '@/lib/graphql/post.graphql'
import CurrentPostModal from '@/components/index/CurrentPostModal'
import { useState } from 'react'
import { Post } from '@/data/posts'

const Example: FunctionComponent = () => {
  const { data: usersData } = useUsersQuery()
  const { users } = usersData!
  const { data: postsData } = usePostsQuery()
  const { posts } = postsData!
  const { data: meData } = useMeQuery()
  const { me } = meData!
  const [shouldPostModalShow, setShouldPostModalShow] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<Post | null>(null)

  const onPostClick = post => {
    setCurrentPost(post)
    setShouldPostModalShow(true)
  }

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
        <div key={post.id}>
          <a onClick={() => onPostClick(post)}>
            <span>title: {post.title}</span>
          </a>
        </div>
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
