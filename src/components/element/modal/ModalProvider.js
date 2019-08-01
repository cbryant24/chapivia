import React, { useState, useEffect, useRef } from 'react';
import { Provider } from './context';
import usePrevious from '../../../hooks/usePrev';

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
