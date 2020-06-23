import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'

const Spinner: FunctionComponent = () => (
  <SpinnerContainer>
    <StyledSpinner />
  </SpinnerContainer>
)

export default Spinner

const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.white};
  opacity: 0.3;
`
const StyledSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  margin: auto;
  border-radius: 50%;
  border: 0.3rem solid;
  border-color: ${Color.gray1};
  border-top-color: ${Color.black};
  animation: 1.5s spin infinite linear;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
