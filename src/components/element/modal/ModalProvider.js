import React, { useState, useEffect, useRef } from 'react';
// import { BaseModalBackground } from './baseStyles';
import { Provider } from './context';
import usePrevious from '../../../hooks/usePrev';
import Box from '../Box';

const ModalProvider = (props) => {
  const [modalNode, setModalNode]             = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);
  const prevBackgroundStyle                   = usePrevious(backgroundStyle);
  const modalDiv                              = useRef();
  
  useEffect( () => {
    setModalNode(modalDiv);
  }, [modalDiv]);
  // debugger
  
  useEffect( () => {
    if(props.backgroundStyle !== prevBackgroundStyle && props.backgroundStyle) {
      debugger
      setBackgroundStyle(props.backgroundStyle);
    }
  });

  return (
    <Provider value={{
      modalNode,
      backgroundStyle
    }}>
      {props.children}
      <div ref={modalDiv}/>
    </Provider>
  );

}

export default ModalProvider;
