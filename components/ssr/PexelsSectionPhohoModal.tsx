import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { PexelsPhotoSchema } from '@/lib/pexels/schema'
import Modal from '@/components/common/Modal'

const PexelsSectionPhohoModal: FunctionComponent<{
  shouldShow: boolean
  onClose: () => void
  currentPhoto: PexelsPhotoSchema | null
}> = ({ shouldShow, onClose, currentPhoto }) => {
  return (
    <Modal shouldShow={shouldShow} onClose={onClose}>
      <CurrentPhotoModalContainer>
        <h3 className='text-center'>
          check the origin photo:{' '}
          <a href={currentPhoto?.src.original} target='_blank'>
            link
          </a>
        </h3>
        <img src={currentPhoto?.src.medium} />
      </CurrentPhotoModalContainer>
    </Modal>
  )
}

export default PexelsSectionPhohoModal

const CurrentPhotoModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
