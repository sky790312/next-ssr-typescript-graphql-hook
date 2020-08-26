import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Modal from '@/components/common/Modal'
import Spinner from '@/components/common/Spinner'
import {
  usePostDetailQuery,
  Post as PostSchema,
} from '@/lib/graphql/post.graphql'

export const CurrentPostModal: FunctionComponent<{
  shouldShow: boolean
  onClose: () => void
  currentPost: PostSchema | null
}> = ({ shouldShow, onClose, currentPost }) => {
  const {
    data: postData,
    loading: isPostDetailLoading,
    error: postDetailError,
  } = usePostDetailQuery({
    variables: { postId: currentPost?.id ?? '' },
  })

  postDetailError && console.log('error: ', postDetailError)

  const postDetail = postData?.postDetail

  return (
    <Modal shouldShow={shouldShow} onClose={onClose}>
      {isPostDetailLoading ? (
        <Spinner />
      ) : (
        <CurrentPostModalContainer>
          <h1>{currentPost?.title}</h1>
          <p>Author: {postDetail?.author}</p>
          <div>
            <h4>recommendPosts:</h4>
            {postDetail?.recommendPosts.map(recommendPost => (
              <p key={recommendPost.id}>
                {recommendPost.title} - {recommendPost.author}
              </p>
            ))}
          </div>
        </CurrentPostModalContainer>
      )}
    </Modal>
  )
}

const CurrentPostModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
