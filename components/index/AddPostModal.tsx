import { FunctionComponent, useState, useCallback } from 'react'
import styled from 'styled-components'
import Modal from '@/components/common/Modal'
import { useAddPostMutation } from '@/lib/graphql/post.graphql'

export const AddPostModal: FunctionComponent<{
  shouldShow: boolean
  onClose: () => void
}> = ({ shouldShow, onClose }) => {
  const [postTitle, setPostTitle] = useState<string>('')
  const [addPostMutation] = useAddPostMutation()
  console.log(addPostMutation)

  const addPost = useCallback(() => {
    console.log('in', postTitle)
    addPostMutation({
      variables: {
        // input: {
        title: postTitle,
        // },
      },
      optimisticResponse: {},
    })
    //       const [loginMutation] = useLoginMutation()
    // …
    // loginMutation({
    //   variables: {
    //     username: 'my username',
    //     password: 'password',
    //   },
    // })
    // const { data: usersData } = useUsersQuery()
    // const users = usersData?.users
    // AddPostInput(postTitle)
  }, [postTitle, addPostMutation])

  return (
    <Modal shouldShow={shouldShow} onClose={onClose}>
      <AddPostModalContainer>
        <input
          type='text'
          placeholder='please enter post title'
          onChange={e => setPostTitle(e.target.value)}
        />
        <button onClick={addPost}>submit</button>
      </AddPostModalContainer>
    </Modal>
  )
}

const AddPostModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
