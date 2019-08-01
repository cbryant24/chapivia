import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { Consumer } from './context'
import usePrevious from '../../../hooks/usePrev';
import BackgroundModal from '../BackgroundModal';

const Modal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const prevModalOpen = usePrevious(modalOpen);

  const {isOpen, afterClose, allowScroll, onEscapeKeydown, afterOpen, backgroundProps} = props;
  const prevIsOpen = usePrevious(isOpen);

  //used to get areference to the background to click on
  const nodeRef = useRef();

  let prevBodyOverflow = null;

  useEffect(() => {
    // debugger
    props.isOpen && setModalOpen(props.isOpen);
  }, [isOpen]);

  useEffect(() => {
    // debugger
    if ( prevModalOpen !== modalOpen) {
      if(!modalOpen) {
        cleanUp();

        afterClose && afterClose();
      } else if (modalOpen) {
        document.addEventListener('keydown', onKeydown);

        if (!allowScroll) {
          prevBodyOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
        }

        afterOpen && afterOpen();
      }
    }

    // Handle prop changes
    if (prevIsOpen !== isOpen) {
      if (isOpen) {
        handleChange('beforeOpen', true);
      } else {
        handleChange('beforeClose', false);
      }
    }

    return cleanUp;
    
  });

  const cleanUp = () => {
    document.removeEventListener('keydown', onKeydown)

    if (!allowScroll) {
      document.body.style.overflow = prevBodyOverflow || ''
    }
  };

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      onEscapeKeydown && onEscapeKeydown(e)
    }
  };

  const handleChange = (event, newState) => {
    // debugger
    if (props[event]) {
      try {
        props[event]()
          .then( setModalOpen(newState));
      } catch (e) {
        setModalOpen(newState);
      }
    } else {
      setModalOpen(newState);
    }
  };

  const onBackgroundClick = (e) => {
    // debugger
    if (nodeRef.current.props.className === e.target.className) {
      props.onBackgroundClick && props.onBackgroundClick(e)
    }
  };

  return (
          <Consumer>
            {({ modalNode, backgroundStyle }) => {
              // debugger
              if (modalNode && isOpen) {
                // debugger
                return ReactDOM.createPortal((
                  <BackgroundModal
                    id="background-modal"
                    // {...backgroundProps}
                    // {...backgroundStyle}
                    onClick={onBackgroundClick}
                    ref={nodeRef}
                  >
                    {props.children}
                  </BackgroundModal>
                ), modalNode.current)
              } else {
                return null
              }
            }}
          </Consumer>
  );
}

export default Modal;
