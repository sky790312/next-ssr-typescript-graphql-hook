import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { PexelsPhotosApiRespSchema } from '@/lib/pexels/schema'
import Spinner from '@/components/common/Spinner'
import { Color } from '@/utils/constants/Color'

const PexelsSectionPhohos: FunctionComponent<{
  isLoading: boolean
  pexelsPhotosData: PexelsPhotosApiRespSchema
  handlePhotoClick: (photo) => void
}> = ({ isLoading, pexelsPhotosData, handlePhotoClick }) => {
  return (
    <PexelsSectionPhotosContainer>
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
    </PexelsSectionPhotosContainer>
  )
}

export default PexelsSectionPhohos

const PexelsSectionPhotosContainer = styled.div`
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
