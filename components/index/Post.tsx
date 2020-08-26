import { FunctionComponent, memo, useRef } from 'react'
import styled from 'styled-components'
import { Post as PostSchema } from '@/lib/graphql/uesr.graphql'

export const Post: FunctionComponent<{
  post: Pick<PostSchema, 'id' | 'title'>
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

const PostWrapper = styled.div`
  a {
    cursor: pointer;
  }
`
