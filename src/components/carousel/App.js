import React from 'react';
import { useStateValue, StateProvider } from './carouselState';
import Carousel from './Carousel';

export { useStateValue };

export default ({ initialSlide = 0, type, style, bp, props, children }) => {
  const initialState = {
    activeSlideIndex: initialSlide,
    // currentSlide: initialSlide,
    //additionalVisibleCarouselItems: 0
    visibleCarouselItemsRange: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_VISIBLE_CAROUSEL_ITEMS':
        return { ...state, visibleCarouselItemsRange: action.payload };

      case 'SET_ACTIVE_SLIDE':
        return { ...state, activeSlideIndex: action.payload };
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Carousel bp={bp} style={style} type={type} {...props}>
        {children}
      </Carousel>
    </StateProvider>
  );
};
