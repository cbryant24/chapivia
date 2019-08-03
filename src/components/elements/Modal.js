import React from 'react';
import { BoxPosition } from '../element';

export const ModalBackground = (
  <BoxPosition 
    display='flex'
    position='fixed'
    top="0"
    left="0"
    width='100vw'
    height='100vh'
    zIndex="30"
    backgroundColor='rgba(0, 0, 0, 0.5)'
    alignItems='center'
    justifyContent='center'
  />
);
