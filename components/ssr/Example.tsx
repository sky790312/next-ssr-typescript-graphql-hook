import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'
import { fetchPexelsPhotos } from '@/lib/pexels'
import {
  PexelsPhotosApiRespSchema,
  PexelsPhotoSchema,
} from '@/lib/pexels/schema'
import { useState, useEffect, useRef } from 'react'
import Modal from '@/components/common/Modal'

const MainSection: FunctionComponent<{
  initialPexelsPhotosData: PexelsPhotosApiRespSchema
}> = ({ initialPexelsPhotosData }) => {
  console.log('in MainSection component')
  const [pexelsPhotosData, setPexelsPhotosData] = useState<
    PexelsPhotosApiRespSchema
  >(initialPexelsPhotosData)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [isPhotoModalShow, setIsPhotoModalShow] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] = useState<PexelsPhotoSchema | null>(
    null,
  )
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      console.log('in MainSection useEffect update')
      async function getPexelsPhotosFn() {
        const data: PexelsPhotosApiRespSchema = await fetchPexelsPhotos(
          currentPage,
        )
        setPexelsPhotosData(data)
      }

      getPexelsPhotosFn()
    }
  }, [currentPage])

  const handlePrevBtnClick = () =>
    setCurrentPage(pexelsPhotosData?.prev_page || '')
  const handleNextBtnClick = () =>
    setCurrentPage(pexelsPhotosData?.next_page || '')

  const handlePhotoClick = photo => {
    setCurrentPhoto(photo)
    setIsPhotoModalShow(true)
  }

  return (
    <MainSectionWrapper>
      <div className='text-center'>
        <StyledButton
          onClick={handlePrevBtnClick}
          disabled={!pexelsPhotosData?.prev_page}
        >
          prev
        </StyledButton>
        <StyledButton
          onClick={handleNextBtnClick}
          disabled={!pexelsPhotosData?.next_page}
        >
          next
        </StyledButton>
      </div>
      <PhotosContainer>
        {pexelsPhotosData?.photos.map(photo => (
          <img src={photo.src.tiny} onClick={() => handlePhotoClick(photo)} />
        ))}
        <Modal
          isShow={isPhotoModalShow}
          onClose={() => setIsPhotoModalShow(false)}
        >
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
      </PhotosContainer>
    </MainSectionWrapper>
  )
}

export default MainSection

const MainSectionWrapper = styled.div`
  background-color: ${Color.secondary};
  color: ${Color.white};
  padding: 50px;
`

const StyledButton = styled.button`
  margin: 0 3px;
  padding: 5px 10px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`

const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  img {
    max-width: 280px;
    max-height: 200px;
    cursor: pointer;
    transition: 0.3s;
    margin: 20px auto;

    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`

const CurrentPhotoModalContainer = styled.div`
  h3 {
    margin-top: 0;
  }
`
