import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { range } from 'lodash';

import { Div, Li, Ul } from '@cbryant24/styled-react';

import { usePrev, useWindowSize } from '../../hooks';
import { useStateValue } from './App';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const Carousel = ({ children, type, style, bp }) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();
  const [
    { activeSlideIndex, visibleCarouselItemsRange },
    dispatch
  ] = useStateValue();

  const prevVisibleCarouselItemsRange = usePrev(visibleCarouselItemsRange);
  const ref = useRef(null);
  const handlers = useSwipeable({
    onSwipedLeft: () => goToPrevSlide(),
    onSwipedRight: () => goToNextSlide(),
    preventDefaultTouchmoveEvent: true
  });

  useEffect(() => {
    // debugger;
    // if (
    //   prevVisibleCarouselItems !== 'undefined' &&
    //   Math.floor(width / bp) !== prevVisibleCarouselItems
    // ) {
    //   // debugger;
    //   dispatch({
    //     type: 'SET_VISIBLE_CAROUSEL_ITEMS',
    //     payload: Math.floor(width / bp)
    //   });
    // }

    setVisibleElementsRange();
    return;
  }, [width, activeSlideIndex]);

  // useEffect(() => {
  //   goToSlide(activeSlideIndex);
  // }, [activeSlideIndex]);

  // debugger;
  function goToSlide() {
    // setActiveIndex(index);
    dispatch({ type: 'SET_ACTIVE_SLIDE', payload: 3 });
  }

  function goToPrevSlide(e) {
    // debugger;
    // e.preventDefault();

    let slide = activeSlideIndex;
    let slidesLength = children.length;

    ref.current = true;

    if (slide < 1) {
      slide = slidesLength;
    }

    --slide;

    dispatch({ type: 'SET_ACTIVE_SLIDE', payload: slide });
  }

  function goToNextSlide(e) {
    // debugger;
    // e.preventDefault();

    let slide = activeSlideIndex;
    let slidesLength = children.length - 1;

    // ref.current = true;

    if (slide === slidesLength) {
      slide = -1;
    }

    ++slide;

    dispatch({ type: 'SET_ACTIVE_SLIDE', payload: slide });
  }

  function carouselIndicator(index) {
    return (
      <Div>
        <Div display={index === activeSlideIndex ? 'active' : 'non-active'}>
          {`carousel indicator ${index}`}
        </Div>
      </Div>
    );
  }

  function getSlidePosition(index) {
    // index++;
    // if (ref.current) {
    //   if (prevActiveSlide === index) {
    //     return { transform: `translateX(-${bp * index})`,  display: index >= additionalVisibleCarouselItems ? 'none' : 'block'}
    //   }
    //   if (prevActiveIndex === index) {
    //     if (prevActiveIndex === children.length - 1)
    //       return { transform: initialCarouselItemPosOut };

    //     if (prevActiveIndex > activeIndex)
    //       return { transform: initialCarouselItemPosOut };

    //     if (prevActiveIndex < activeIndex)
    //       return { transform: afterCarouselItemPosOut };
    //   }

    //   if (index === activeIndex) {
    //     if (activeIndex === children.length - 1)
    //       return { transform: initialCarouselItemPos };

    //     if (activeIndex > prevActiveIndex)
    //       return { transform: initialCarouselItemPos };

    //     if (activeIndex < prevActiveIndex)
    //       return { transform: initialCarouselItemPos };
    //   }

    //   return {
    //     transform:
    //       index < activeIndex
    //         ? afterCarouselItemPosOut
    //         : initialCarouselItemPosOut
    //   };
    // }
    // debugger;
    // if (activeSlideIndex === additionalVisibleCarouselItems) {
    // }
    // if (activeSlideIndex === index) {
    //   return {
    //     transform: 'translateX(0)',
    //     width:
    //       additionalVisibleCarouselItems.length > 1
    //         ? `${bp - bp * 0.05}px`
    //         : '100%'
    //   };
    // }
    // debugger;
    return {
      transform: getTranslatePosition(index),
      visibility: visibleCarouselItemsRange.includes(parseInt(index))
        ? 'visible'
        : 'hidden',
      height: visibleCarouselItemsRange.includes(parseInt(index))
        ? 'auto'
        : '0',
      width: visibleCarouselItemsRange.includes(parseInt(index))
        ? `${bp - bp * 0.05}px`
        : '0'
    };
  }

  function setVisibleElementsRange(index) {
    const additionalVisibleCarouselItems = Math.floor(width / bp);
    let visibleRange = [];
    debugger;
    if (additionalVisibleCarouselItems) {
      let carouselStart =
        activeSlideIndex - Math.floor(additionalVisibleCarouselItems / 2);
      let carouselEnd =
        activeSlideIndex + Math.floor(additionalVisibleCarouselItems / 2);

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

  function getTranslatePosition(index) {
    const middleCarouselPlace = Math.floor(
      visibleCarouselItemsRange.length / 2
    );
    const width = `${bp - bp * 0.05}px`;
    debugger;
    if (activeSlideIndex === index) {
      if (
        visibleCarouselItemsRange.length > 1 &&
        visibleCarouselItemsRange.length % 2 === 1
      ) {
        return {
          transform: `translateX(${bp * middleCarouselPlace}px)`,
          height: '100%',
          width,
          color: 'blue'
        };
      }

      if (
        visibleCarouselItemsRange.length > 1 &&
        visibleCarouselItemsRange.length % 2 === 0
      ) {
        return {
          transform: `translateX(${bp * middleCarouselPlace}px)`,
          height: '100%',
          width
        };
      }

      return {
        transform: 'translateX(0)',
        height: '100%',
        width
      };
    }

    if (visibleCarouselItemsRange.includes(parseInt(index))) {
      const carouselItemPos =
        visibleCarouselItemsRange.indexOf(parseInt(index)) -
        middleCarouselPlace;
      return {
        transform: `translateX(${bp * carouselItemPos}px)`,
        width
      };
    }

    return {
      visibility: 'hidden',
      height: 0,
      width: 0
    };
  }

  function carouselSlide(index) {
    //TODO: Add documentation of how to dynamically set props for css
    // debugger;
    const carouselItemPosition = getTranslatePosition(
      index
      //carouselElRef[index].current
    );

    return (
      <Li
        //className={index === activeIndex ? 'active' : 'non-active'}
        //ref={carouselElRef[index]}
        id={`carousel-item-${index}`}
        gridRow="1 / span 1"
        gridColumn="1 / span 1"
        transition="all 1s"
        {...carouselItemPosition}
      >
        {children[index]}
      </Li>
    );
  }
  function setCarousel() {}
  // debugger;
  if (!children.length)
    return (
      <Div width={[1]} height={[1]}>
        {children}
      </Div>
    );
  return (
    <div {...handlers}>
      <Div {...style}>
        <Ul
          id="styled-react-carousel-ul"
          display="grid"
          gridTemplateRows="100%"
          gridColumnRows="100%"
          position="relative"
          width="100%"
          ref={ref}
        >
          {children.map((item, idx) => carouselSlide(idx))}
        </Ul>
      </Div>
    </div>
  );
};

export default Carousel;
