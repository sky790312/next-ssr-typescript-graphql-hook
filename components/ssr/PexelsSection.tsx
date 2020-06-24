import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'
import { fetchPexelsPhotos } from '@/lib/pexels'
import {
  PexelsPhotosApiRespSchema,
  PexelsPhotoSchema,
} from '@/lib/pexels/schema'
import { useState, useEffect, useRef } from 'react'
import PexelsSectionArrows from '@/components/ssr/PexelsSectionArrows'
import PexelsSectionPhohos from '@/components/ssr/PexelsSectionPhohos'
import PexelsSectionPhohoModal from '@/components/ssr/PexelsSectionPhohoModal'

import useFetch from '@/hooks/useFetch'

const PexelsSection: FunctionComponent<{
  initialPexelsPhotosData: PexelsPhotosApiRespSchema
}> = ({ initialPexelsPhotosData }) => {
  const [pexelsPhotosData, setPexelsPhotosData] = useState<
    PexelsPhotosApiRespSchema
  >(initialPexelsPhotosData)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [shouldPhotoModalShow, setShouldPhotoModalShow] = useState<boolean>(
    false,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] = useState<PexelsPhotoSchema | null>(
    null,
  )
  const isInitialMount = useRef(true)

  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos/1',
  )
  console.log('in')
  console.log(data)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      const doFetchPexelsPhotos = async () => {
        setIsLoading(true)
        const data: PexelsPhotosApiRespSchema = await fetchPexelsPhotos(
          currentPage,
        )
        setPexelsPhotosData(data)
        setIsLoading(false)
      }

      doFetchPexelsPhotos()
    }
  }, [currentPage])

  const handleArrowClick = page => setCurrentPage(page)

  const handlePhotoClick = photo => {
    setCurrentPhoto(photo)
    setShouldPhotoModalShow(true)
  }

  const onPhotoModalClose = () => {
    setCurrentPhoto(null)
    setShouldPhotoModalShow(false)
  }

  return (
    <PexelsSectionContainer>
      <PexelsSectionArrows
        pexelsPhotosData={pexelsPhotosData}
        handleArrowClick={handleArrowClick}
      />
      <PexelsSectionPhohos
        isLoading={isLoading}
        pexelsPhotosData={pexelsPhotosData}
        handlePhotoClick={handlePhotoClick}
      />
      <PexelsSectionPhohoModal
        shouldShow={shouldPhotoModalShow}
        onClose={onPhotoModalClose}
        currentPhoto={currentPhoto}
      />
    </PexelsSectionContainer>
  )
}

export default PexelsSection

const PexelsSectionContainer = styled.div`
  background-color: ${Color.secondary};
  color: ${Color.white};
  padding: 50px;
`
