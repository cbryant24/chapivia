import React, { useEffect } from 'react';
import { useStateValue, StateProvider } from './carouselState';
import InfiniteCarousel from '../styledComponents/InfiniteCarousel';

export { useStateValue };

// TODO: add way to pull initial slide off component prop
// TODO: add ability to pass normal jsx not styled-react elements 🙄
// TODO:
export default ({ type, style, bp, props, maxCarouselCount, children }) => {
  // const { count, range } = getRangeCount(bp, initialSlide);
  const initialState = {
    type,
    bp,
    maxCarouselCount: children.length || maxCarouselCount
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_CAROUSEL_RANGE':
        return { ...state, visibleCarouselRange: action.payload };
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <InfiniteCarousel style={style} type={type} {...props}>
        {children}
      </InfiniteCarousel>
    </StateProvider>
  );
};
