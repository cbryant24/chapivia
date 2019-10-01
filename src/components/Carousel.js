import React, { useState, useEffect } from 'react';
import { Flex } from './element';

const Carousel = ({ children, type }) => {
  const [ carousel, setCarousel ] = useState(children.reduce((o, key, idx) => ({ ...o, [idx]: idx}), {}));

  return (
    <Flex>
      {children}
    </Flex>
  );
};

export default Carousel;