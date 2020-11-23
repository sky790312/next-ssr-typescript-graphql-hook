import { FunctionComponent, memo, useRef } from 'react'
import styled from 'styled-components'
import { Post as PostSchema } from '@/lib/graphql/user.graphql'

export const Post: FunctionComponent<{
  post: Pick<PostSchema, 'id' | 'title'>
  onPostClick: (post) => void
}> = memo(({ post, onPostClick }) => {
  const refCount = useRef(0)
  return (
    <PostWrapper>
      <a onClick={() => onPostClick(post)}>
        <span>title: {post?.title}</span>
      </a>
      <p>render count: {refCount.current++}</p>
    </PostWrapper>
  )
})

const PostWrapper = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid black;

  a {
    cursor: pointer;
  }
`
