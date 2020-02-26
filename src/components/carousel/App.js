import React, { useEffect } from 'react';
import { useStateValue, StateProvider } from './carouselState';
import setCarouselRange from './setCarouselRange';
import Carousel from './Carousel';

export { useStateValue };

export default ({ initialSlide = 0, type, style, bp, props, children }) => {
  const initialState = {
    activeSlideIndex: initialSlide,
    visibleCarouselRange: [],
    visibleCarouselCount: null,
    type,
    bp,
    carouselCount: children.length
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_VISIBLE_CAROUSEL_COUNT':
        return { ...state, visibleCarouselCount: action.payload };
      case 'SET_VISIBLE_CAROUSEL_RANGE':
        return { ...state, visibleCarouselRange: action.payload };
      case 'SET_ACTIVE_SLIDE':
        return { ...state, activeSlideIndex: action.payload };
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Carousel style={style} type={type} {...props}>
        {children}
      </Carousel>
    </StateProvider>
  );
};
