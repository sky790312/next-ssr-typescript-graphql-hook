import { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isClient } from '@/utils'
import { Color } from '@/utils/constants/Color'

const Modal: FunctionComponent<{
  isShow: boolean
  onClose: () => void
}> = props => {
  const onOverlayClicked = e => {
    if (e.target.className !== 'modal-wrapper') {
      return
    }

    props.onClose()
  }

  return isClient() && props.isShow
    ? ReactDOM.createPortal(
        <StyledModal>
          <div className='modal-overlay' />
          <div
            className='modal-wrapper'
            aria-modal
            aria-hidden
            tabIndex={-1}
            role='dialog'
            onClick={onOverlayClicked}
          >
            <div className='modal-inner-wrapper'>
              <div className='modal-close-container'>
                <button
                  type='button'
                  className='close-button'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={props.onClose}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              {props.children}
            </div>
          </div>
        </StyledModal>,
        document.body,
      )
    : null
}

export default Modal

const StyledModal = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100%;
    height: 100vh;
    background-color: ${Color.black};
    opacity: 0.5;
  }

  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
  }

  .modal-inner-wrapper {
    z-index: 100;
    background-color: ${Color.white};
    position: relative;
    border-radius: 3px;
    padding: 2rem;
    margin: 10vh auto;
    max-width: 90vw;

    @media (min-width: 992px) {
      max-width: 576px;
    }
  }

  .modal-close-container {
    display: flex;
    justify-content: flex-end;

    .close-button {
      font-size: 1.8rem;
      font-weight: bold;
      line-height: 1;
      color: ${Color.black};
      opacity: 0.3;
      cursor: pointer;
      border: none;
      background-color: ${Color.white};
    }
  }
`
