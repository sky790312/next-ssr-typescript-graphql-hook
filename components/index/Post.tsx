import { FunctionComponent, memo, useRef } from 'react'
import styled from 'styled-components'
import { PostSchema } from '@/data/posts'

// TODOS: typescript with graphql scaler type
const Post: FunctionComponent<{ post; onPostClick }> = memo(
  ({ post, onPostClick }) => {
    const refCount = useRef(0)
    return (
      <PostWrapper>
        <a onClick={() => onPostClick(post)}>
          <span>title: {post?.title}</span>
          <p>{refCount.current++}</p>
        </a>
      </PostWrapper>
    )
  },
)

export default Post

const PostWrapper = styled.div`
  a {
    cursor: pointer;
  }
`
