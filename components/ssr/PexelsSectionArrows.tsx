import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { PexelsPhotosApiRespSchema } from '@/lib/pexels/schema'

const PexelsSectionArrows: FunctionComponent<{
  pexelsPhotosData: PexelsPhotosApiRespSchema
  handleArrowClick: (page) => void
}> = ({ pexelsPhotosData, handleArrowClick }) => {
  const handlePrevBtnClick = () => handleArrowClick(pexelsPhotosData?.prev_page)
  const handleNextBtnClick = () => handleArrowClick(pexelsPhotosData?.next_page)

  return (
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
  )
}

export default PexelsSectionArrows

const StyledButton = styled.button`
  margin: 0 3px;
  padding: 5px 10px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`
