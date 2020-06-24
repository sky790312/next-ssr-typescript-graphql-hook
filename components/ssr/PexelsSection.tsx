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
import Spinner from '@/components/common/Spinner'

const PexelsSection: FunctionComponent<{
  initialPexelsPhotosData: PexelsPhotosApiRespSchema
}> = ({ initialPexelsPhotosData }) => {
  const [pexelsPhotosData, setPexelsPhotosData] = useState<
    PexelsPhotosApiRespSchema
  >(initialPexelsPhotosData)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [isPhotoModalShow, setIsPhotoModalShow] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] = useState<PexelsPhotoSchema | null>(
    null,
  )
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      async function getPexelsPhotosFn() {
        setIsLoading(true)
        const data: PexelsPhotosApiRespSchema = await fetchPexelsPhotos(
          currentPage,
        )
        setPexelsPhotosData(data)
        setIsLoading(false)
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
    <PexelsSectionContainer>
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
        {isLoading && <Spinner />}
        <PhotosInnerContainer className={isLoading ? 'loading' : ''}>
          {pexelsPhotosData?.photos.map(photo => (
            <img
              key={photo.id}
              src={photo.src.tiny}
              onClick={() => handlePhotoClick(photo)}
            />
          ))}
        </PhotosInnerContainer>
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
    </PexelsSectionContainer>
  )
}

export default PexelsSection

const PexelsSectionContainer = styled.div`
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
  position: relative;
  margin: 40px 0;
`

const PhotosInnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  transition: 0.3s;

  &.loading {
    opacity: 0.3;
    background-color: ${Color.white};
  }

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
