import React, { useEffect, useState } from 'react';
import { range } from 'lodash';
import { usePrev, useWindowSize } from '../../hooks';
import { useStateValue } from './App';

function setCarouselRange(activeSlideIndex, bp, visibleCarouselCount) {
  const [carouselRange, setCarouselRange] = useState(createCarouselRange());
  const [visibleCarouselCount, setVisibleCarouselCount] = useState(Math.floor(width / bp));
  const prevVisibleCarouselCount = usePrev(visibleCarouselCount);
  debugger
  const { width } = useWindowSize();
  debugger
  //const prevCarouselRange = usePrev(carouselRange);
  const [
    { activeSlideIndex, bp, visibleCarouselCount },
    dispatch
  ] = useStateValue();
  debugger
  useEffect(() => {
      dispatch({type: 'SET_VISIBLE_CAROUSEL_RANGE', payload: createCarouselRange()});
      return;
  }, [visibleCarouselCount]);

  useEffect(() => {
    const newCarouselCount = Math.floor(width / bp);
    if (visibleCarouselCount !== newCarouselCount)
      dispatch({type: 'SET_VISIBLE_CAROUSEL_COUNT', payload: newCarouselCount});

  }, [width])

  function createCarouselRange() {
    let visibleRange = [];
    // debugger
    if (visibleCarouselCount) {
      let carouselStart = activeSlideIndex - Math.floor(visibleCarouselCount / 2);
      let carouselEnd = activeSlideIndex + Math.floor(visibleCarouselCount / 2);
  
      if (carouselStart < 0) {
        carouselEnd = carouselEnd + Math.abs(carouselStart);
        carouselStart = 0;
      }

      if (carouselEnd > visibleCarouselCount) {
        carouselEnd = visibleCarouselCount;
      }
  
      visibleRange = range(carouselStart, carouselEnd);
  
      return visibleRange
    }
  
    visibleRange = [activeSlideIndex];

    return visibleRange;
  
  }
}

export default setCarouselRange;
