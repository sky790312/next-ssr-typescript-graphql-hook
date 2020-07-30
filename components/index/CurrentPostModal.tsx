import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Modal from '@/components/common/Modal'
import Spinner from '@/components/common/Spinner'
import {
  usePostDetailQuery,
  Post as PostSchema,
} from '@/lib/graphql/post.graphql'

const CurrentPostModal: FunctionComponent<{
  shouldShow: boolean
  onClose: () => void
  currentPost: PostSchema | null
}> = ({ shouldShow, onClose, currentPost }) => {
  const {
    data: postData,
    loading: isPostDetailLoading,
    error: isPostDetailError,
  } = usePostDetailQuery({
    variables: { postId: currentPost?.id ?? '' },
  })

  if (isPostDetailError) {
    console.log('in 2', isPostDetailError)
  }
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
              <span key={recommendPost.id}>{recommendPost.title}</span>
            ))}
          </div>
        </CurrentPostModalContainer>
      )}
    </Modal>
  )
}

export default CurrentPostModal

const CurrentPostModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
