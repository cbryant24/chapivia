import React, { useEffect } from 'react';
import { useWindowSize } from '../../hooks';
function useCarouselRange() {
  const { width } = useWindowSize();
  const visibleCarouselItems = Math.floor(width / bp);
  let visibleRange = [];
  debugger;
  if (visibleCarouselItems) {
    let carouselStart = activeSlideIndex - Math.floor(visibleCarouselItems / 2);
    let carouselEnd = activeSlideIndex + Math.floor(visibleCarouselItems / 2);

    if (carouselStart < 0) {
      carouselEnd = carouselEnd + Math.abs(carouselStart);
      carouselStart = 0;
    }

    visibleRange = range(carouselStart, carouselEnd);

    dispatch({ type: 'SET_VISIBLE_CAROUSEL_ITEMS', payload: visibleRange });
    return;
  }

  visibleRange = [activeSlideIndex];

  dispatch({ type: 'SET_VISIBLE_CAROUSEL_ITEMS', payload: visibleRange });
}

export default setVisibleElementsRange;
