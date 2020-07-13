import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { PostSchema } from '@/data/posts'
import Modal from '@/components/common/Modal'
import { usePostDetailQuery } from '@/lib/graphql/post.graphql'

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

  if (isPostDetailLoading) {
    console.log('in 1', isPostDetailLoading)
  }

  if (isPostDetailError) {
    console.log('in 2', isPostDetailError)
  }
  console.log(postData)

  return (
    <Modal shouldShow={shouldShow} onClose={onClose}>
      <CurrentPostModalContainer>
        {currentPost?.title}
      </CurrentPostModalContainer>
    </Modal>
  )
}

export default CurrentPostModal

const CurrentPostModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
