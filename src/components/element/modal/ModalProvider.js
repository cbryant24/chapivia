import React, { useState, useEffect, useRef } from 'react';
import ModalContext from './context';
import usePrevious from '../../../hooks/usePrev';
import ModalBackground from './ModalBackground';

const ModalProvider = (props) => {
  const [modalNode, setModalNode]                     = useState(null);
  const [BackgroundComponent, setBackgroundComponent] = useState(ModalBackground);
  const prevBackgroundComponent                       = usePrevious(BackgroundComponent);
  const modalDiv                                      = useRef();
  
  useEffect( () => {
    setModalNode(modalDiv);
  }, [modalDiv]);
  // debugger
  
  //TODO: need to add a check for a proper background and and if they want "no background"
  useEffect( () => {
    if(props.BackgroundComponent !== prevBackgroundComponent && props.BackgroundComponent) {
      // debugger
      setBackgroundComponent(props.BackgroundComponent);
    }
  });

  return (
    <ModalContext.Provider value={{
      modalNode,
      BackgroundComponent
    }}>
      {props.children}
      <div ref={modalDiv}/>
    </ModalContext.Provider>
  );

}

export default ModalProvider;
