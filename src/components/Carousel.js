import React, { useState, useEffect, useRef, createRef } from 'react';
import { Flex, BoxAnimated, SlideAnimations, BoxAll, ULFLEX } from './element';
import { usePrev } from '../hooks';
import { useSwipeable } from 'react-swipeable';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const Carousel = ({ 
  children,
  type,
  carouselAnimationsTransitions = {},
  transition,
  initialCarouselItemPos,
  initialCarouselItemPosOut,
  afterCarouselItemPosOut,
  ...props 
}) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const prevActiveIndex                 = usePrev(activeIndex);
  const carouselElRef                   = children.map( () => useRef(null));
  const handlers                        = useSwipeable({ 
    onSwipedLeft: () => goToPrevSlide(),
    onSwipedRight: () => goToNextSlide(),
    preventDefaultTouchmoveEvent: true 
  });

  function goToSlide(index) {
    setActiveIndex(index);
  }

  function goToPrevSlide(e) {
    // e.preventDefault();

    let index = activeIndex;
    let slidesLength = children.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    setActiveIndex(index);
  }

  function goToNextSlide(e) {
    // e.preventDefault();

    let index = activeIndex;
    let slidesLength = children.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    setActiveIndex(index);
  }

  function carouselIndicator(index) {
    return (
      <BoxAll
        isA="li"
      >
        <BoxAll
          className={ index === activeIndex ? "active" : "non-active"}
        >
        {`carousel indicator ${index}`}
        </BoxAll>
      </BoxAll>
    );
  }

  function getSlidePosition(index, carouselRef) {
    
    if (carouselRef) {
      if (prevActiveIndex === index) {
        if (prevActiveIndex === children.length - 1)
          return { transform: initialCarouselItemPosOut }

        if (prevActiveIndex > activeIndex) 
          return { transform: initialCarouselItemPosOut }

        if (prevActiveIndex < activeIndex)
          return { transform: afterCarouselItemPosOut }
      }

      if (index === activeIndex) {
        if (activeIndex === children.length - 1)
          return { transform: initialCarouselItemPos }

        if (activeIndex > prevActiveIndex)
          return { transform: initialCarouselItemPos }

        if (activeIndex < prevActiveIndex)
          return { transform: initialCarouselItemPos }
      }


      return { 
        transform:  index < activeIndex ? afterCarouselItemPosOut :  initialCarouselItemPosOut
      };
    }

    return { transform: activeIndex === index ? initialCarouselItemPos : initialCarouselItemPosOut}
  }

  function carouselSlide(index) {
    //TODO: Add documentation of how to dynamically set props for css
    // debugger
    const carouselItemPosition = getSlidePosition(index, carouselElRef[index].current);

    return (
      <BoxAll
        className={ index === activeIndex ? "active" : "non-active" }
        ref={carouselElRef[index]}
        id={`carousel-item-${index}`}
        isA="li"
        gridRow="1 / span 1"
        gridColumn="1 / span 1"
        border={`2px solid ${index === activeIndex ? 'red' : 'white'}`}
        width="100%"
        height="100%"
        transition={transition}
        {...carouselItemPosition}
      >
        {children[index]}
      </BoxAll>
    );
  }

  return (
      <div {...handlers}>
        <BoxAll
          id="carousel-box"
          display="flex"
          flexWrap="wrap"
          width="90vw"
          overflow="hidden"
          //{...handlers}
          {...carouselAnimationsTransitions.transition}
        >
          <BoxAll
            id="carousel-ul"
            isA="ul"
            display="grid"
            gridTemplateRows="100%"
            gridColumnRows="100%"
            position="relative"
            //height="50vh"
            width="100%"
            //width={[1]}
          >
            { children.map( (item, idx) => (carouselSlide(idx))) }
          </BoxAll>
          {/* <BoxAll
            isA="ul"
            display="flex"
          >
            { children.map( (item, idx) => (carouselIndicator(idx))) }
          </BoxAll> */}
          {/* <BoxAll
            onClick={ e => goToNextSlide(e) }
          >
            Right Arrow
          </BoxAll> */}
        </BoxAll>
      </div>
  );
};

export default Carousel;