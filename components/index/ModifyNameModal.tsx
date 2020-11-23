import { FunctionComponent, useState, useCallback } from 'react'
import styled from 'styled-components'
import Modal from '@/components/common/Modal'
import { useUpdateNameMutation, MeDocument } from '@/lib/graphql/user.graphql'

export const ModifyNameModal: FunctionComponent<{
  shouldShow: boolean
  onClose: () => void
}> = ({ shouldShow, onClose }) => {
  const [newName, setNewName] = useState<string>('')
  const [updateNameMutation] = useUpdateNameMutation()

  const handleUpdateName = useCallback(() => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      update: (
        store,
        {
          data: {
            updateName: { name },
          },
        },
      ) => {
        const { me: updatedMe } = store.readQuery({ query: MeDocument })
        updatedMe.name = name
        store.writeQuery({ query: MeDocument, data: { me: updatedMe } })
        onClose()
      },
    })
  }, [newName, updateNameMutation, onClose])

  return (
    <Modal shouldShow={shouldShow} onClose={onClose}>
      <ModifyNameModalContainer>
        <input
          type='text'
          placeholder='Modify your name'
          onChange={e => setNewName(e.target.value)}
        />
        <button onClick={handleUpdateName}>Modify</button>
      </ModifyNameModalContainer>
    </Modal>
  )
}

const ModifyNameModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
