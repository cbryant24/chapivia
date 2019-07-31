import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { Consumer } from './context'
import usePrevious from '../../../hooks/usePrev';
import Box from '../Box';

const Modal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const prevModalOpen = usePrevious(modalOpen);

  const {isOpen, afterClose, allowScroll, onEscapeKeydown, afterOpen, backgroundProps} = props;
  const prevIsOpen = usePrevious(isOpen);

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
  }

  const onBackgroundClick = (e) => {
    if (nodeRef === e.target) {
      props.onBackgroundClick && props.onBackgroundClick(e)
    }
  }

  return (
          <Consumer>
            {({ modalNode, BackgroundComponent }) => {
              debugger
              if (modalNode && BackgroundComponent && isOpen) {
                debugger
                return ReactDOM.createPortal((
                  <BackgroundComponent
                    {...backgroundProps}
                    onClick={onBackgroundClick}
                    ref={nodeRef}>
                    {props.children}
                  </BackgroundComponent>
                ), modalNode)
              } else {
                return null
              }
            }}
          </Consumer>
  );
}

export default Modal;

// // class Modal extends Component {
// //   constructor (props) {
// //     super(props)

// //     this.state = { isOpen: false }

// //     this.node = null
// //     this.prevBodyOverflow = null

// //     this.onKeydown = this.onKeydown.bind(this)
// //     this.onBackgroundClick = this.onBackgroundClick.bind(this)
// //     this.cleanUp = this.cleanUp.bind(this)
// //   }

// //   static styled (...args) {
// //     const styles = styled.div`${css(...args)}` || styled.div``
// //     return class __StyledModal extends Component {
// //       render () {
// //         return <Modal WrapperComponent={styles} {...this.props} />
// //       }
// //     }
// //   }

// //   componentDidMount () {
// //     this.props.isOpen && this.setState({ isOpen: this.props.isOpen })
// //   }

// //   componentDidUpdate (prevProps, prevState) {
// //     // Handle state changes
// //     if (prevState.isOpen !== this.state.isOpen) {
// //       if (!this.state.isOpen) {
// //         this.cleanUp()

// //         this.props.afterClose && this.props.afterClose()
// //       } else if (this.state.isOpen) {
// //         document.addEventListener('keydown', this.onKeydown)

// //         if (!this.props.allowScroll) {
// //           this.prevBodyOverflow = document.body.style.overflow
// //           document.body.style.overflow = 'hidden'
// //         }

// //         this.props.afterOpen && this.props.afterOpen()
// //       }
// //     }

// //     // Handle prop changes
// //     if (prevProps.isOpen !== this.props.isOpen) {
// //       if (this.props.isOpen) {
// //         this.handleChange('beforeOpen', { isOpen: true })
// //       } else {
// //         this.handleChange('beforeClose', { isOpen: false })
// //       }
// //     }
// //   }

// //   handleChange (event, newState) {
// //     if (this.props[event]) {
// //       try {
// //         this.props[event]()
// //           .then(() => this.setState(newState))
// //       } catch (e) {
// //         this.setState(newState)
// //       }
// //     } else {
// //       this.setState(newState)
// //     }
// //   }

// //   componentWillUnmount () {
// //     if (this.props.isOpen) this.cleanUp()
// //   }

// //   cleanUp () {
// //     document.removeEventListener('keydown', this.onKeydown)

// //     if (!this.props.allowScroll) {
// //       document.body.style.overflow = this.prevBodyOverflow || ''
// //     }
// //   }

// //   onKeydown (e) {
// //     if (e.key === 'Escape') {
// //       this.props.onEscapeKeydown && this.props.onEscapeKeydown(e)
// //     }
// //   }

// //   onBackgroundClick (e) {
// //     if (this.node === e.target) {
// //       this.props.onBackgroundClick && this.props.onBackgroundClick(e)
// //     }
// //   }

// //   render () {
// //     // Destructuring own props to avoid unknown prop warning in the DOM.
// //     const {
// //       WrapperComponent,
// //       children,
// //       onBackgroundClick,
// //       onEscapeKeydown,
// //       allowScroll,
// //       beforeOpen,
// //       afterOpen,
// //       beforeClose,
// //       afterClose,
// //       backgroundProps,
// //       isOpen: isOpenProp,
// //       ...rest
// //     } = this.props

// //     const { isOpen } = this.state

// //     let content
// //     if (WrapperComponent) {
// //       content = (
// //         <WrapperComponent {...rest}>
// //           {children}
// //         </WrapperComponent>
// //       )
// //     } else {
// //       content = children
// //     }

// //     return (
// //       <Consumer>
// //         {({ modalNode, BackgroundComponent }) => {
// //           if (modalNode && BackgroundComponent && isOpen) {
// //             return ReactDOM.createPortal((
// //               <BackgroundComponent
// //                 {...backgroundProps}
// //                 onClick={this.onBackgroundClick}
// //                 ref={node => { this.node = node }}>
// //                 {content}
// //               </BackgroundComponent>
// //             ), modalNode)
// //           } else {
// //             return null
// //           }
// //         }}
// //       </Consumer>
// //     )
// //   }
// // }

// // Modal.defaultProps = {
// //   backgroundProps: {}
// // }

// export default Modal