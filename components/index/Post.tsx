import { FunctionComponent, memo, useRef } from 'react'
import styled from 'styled-components'
import { Post as PostSchema } from '@/lib/graphql/uesr.graphql'

// TODOS: typescript with graphql scalar type
const Post: FunctionComponent<{
  post: PostSchema
  onPostClick: (post) => void
}> = memo(({ post, onPostClick }) => {
  const refCount = useRef(0)
  return (
    <PostWrapper>
      <a onClick={() => onPostClick(post)}>
        <span>title: {post?.title}</span>
        <p>{refCount.current++}</p>
      </a>
    </PostWrapper>
  )
})

export default Post

const PostWrapper = styled.div`
  a {
    cursor: pointer;
  }
`
