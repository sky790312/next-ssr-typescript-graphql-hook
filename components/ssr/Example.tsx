import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'
import { fetchPexelsPhotos } from '@/lib/pexels'
import { PexelsPhotosApiRespSchema } from '@/lib/pexels/schema'
import { useState, useEffect, useRef } from 'react'

const MainSection: FunctionComponent<{
  initialPexelsPhotosData: PexelsPhotosApiRespSchema
}> = ({ initialPexelsPhotosData }) => {
  console.log('in component')
  const [pexelsPhotosData, setPexelsPhotosData] = useState(
    initialPexelsPhotosData,
  )
  const [currentPage, setCurrentPage] = useState('')
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      console.log('in useEffect update')
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

  return (
    <MainSectionWrapper>
      <p>prev_page: {pexelsPhotosData?.prev_page}</p>
      <p>next_page: {pexelsPhotosData?.next_page}</p>
      <p>currentPage: {currentPage}</p>
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
