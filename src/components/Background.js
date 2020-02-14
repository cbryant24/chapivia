import React from 'react';
import { Div } from '@cbryant24/styled-react';
import { infiniteBackground } from './style';
import galagaGif from './galaga_bg.gif';

export default () => {
  return (
    <Div
      id="background"
      position="absolute"
      top="0"
      left="0"
      backgroundImage={`url(${galagaGif})`}
      backgroundRepeat="repeat"
      backgroundPosition="0 0"
      backgroundSize="auto 100%"
      backgroundColor="black"
      height={[1]}
      width={[1]}
      animation={infiniteBackground}
      zIndex={-1}
    ></Div>
  );
};
