import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Color } from '@/utils/constants/Color'

const Spinner: FunctionComponent = () => <StyledSpinner />

export default Spinner

const StyledSpinner = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  margin: -1rem 0 0 -1rem;
  border-radius: 50%;
  border: 0.3rem solid;
  border-color: ${Color.gray1};
  border-top-color: ${Color.white};
  animation: 1.5s spin infinite linear;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
