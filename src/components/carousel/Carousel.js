import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { range } from 'lodash';

import { Div, Li, Ul } from '@cbryant24/styled-react';

import { usePrev, useWindowSize } from '../../hooks';
import { useStateValue } from './App';
import setCarouselRange from './setCarouselRange';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const Carousel = ({ children, style}) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();
  const [
    { activeSlideIndex, visibleCarouselRange, bp },
    dispatch
  ] = useStateValue();

  //if (!visibleCarouselRange.length) return <div></div>;

  useEffect(() => {
    setCarouselRange();
  },[children]);

  const prevVisibleCarouselItemsRange = usePrev(visibleCarouselRange);
  //const ref = useRef(null);
  const handlers = useSwipeable({
    onSwipedLeft: () => goToPrevSlide(),
    onSwipedRight: () => goToNextSlide(),
    preventDefaultTouchmoveEvent: true
  });

  // useEffect(() => {
  //   setVisibleElementsRange();
  //   return;
  // }, [width, activeSlideIndex]);

  // debugger;
  function goToSlide() {
    dispatch({ type: 'SET_ACTIVE_SLIDE', payload: 3 });
  }

  function goToPrevSlide(e) {
    let slide = activeSlideIndex;
    let slidesLength = children.length;

    //ref.current = true;

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

  function getTranslatePosition(index) {
    debugger
    const middleCarouselPlace = Math.floor(
      visibleCarouselRange.length / 2
    );
    const width = `${bp - bp * 0.05}px`;
    // debugger;
    if (activeSlideIndex === index) {
      if (
        visibleCarouselRange.length > 1 &&
        visibleCarouselRange.length % 2 === 1
      ) {
        return {
          transform: `translateX(${bp * middleCarouselPlace}px)`,
          height: '100%',
          width,
          color: 'blue'
        };
      }

      if (
        visibleCarouselRange.length > 1 &&
        visibleCarouselRange.length % 2 === 0
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
        width: '100%'
      };
    }

    if (visibleCarouselRange.includes(parseInt(index))) {
      const carouselItemPos =
        visibleCarouselRange.indexOf(parseInt(index)) -
        middleCarouselPlace;
      return {
        transform: `translateX(${bp * carouselItemPos}px)`,
        width
      };
    }

    return {
      visibility: 'hidden',
      transform: `translateX(${(index - activeSlideIndex) * bp}px)`,
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
        transition="transform 1s"
        //margin="auto"
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
          //ref={ref}
        >
          {children.map((item, idx) => carouselSlide(idx))}
        </Ul>
      </Div>
    </div>
  );
};

export default Carousel;
