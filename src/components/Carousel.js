import React, { useState, useEffect } from 'react';
import { Flex, BoxAnimated, SlideAnimations } from './element';
import { usePrev } from '../hooks';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const Carousel = ({ children, type, animationIn, animationOut, infinite }) => {
  // const [ leftDisabled, setLeftDisabled ]           = useState(false);
  // const [ rightDisabled, setRightDisabled ]         = useState(false);
  const [ initialItemIndex, setInitialItemIndex ]   = useState(setInitialItem);
  const [ carouselOrder, setCarouselOrder ]         = useState(setInitialCarousel);
  const prevInitialItemIndex                        = usePrev(initialItemIndex);
  const prevCarouselOrder                           = usePrev(carouselOrder);

  function setInitialItem() {
    let initialItemIndex = 0;
    debugger
    children.some( (child, idx) => {
      if (child.props.initialItem) {
        initialItemIndex = idx;

        return true;
      }
    });

    return initialItemIndex;
  }

  function setInitialCarousel() {
    let carouselItemCount = 0;
    const carouselPosition = {}
    children.forEach( child => child.props.carouselItem ? carouselItemCount++ : '');
    if (infinite) {
      if (initialItemIndex > 0) {
        const carouselIndexStart = initialItemIndex * -1;
        const carouselOrder =  children.reduce((o, child, idx) => !child.props.carouselItem ?  
                                        ({...o}) : ({ ...o, [`pos${idx + carouselIndexStart}`]: idx + carouselIndexStart}), {});
                                        console.log(carouselOrder)
        checkCarouselItemOrder(carouselOrder);
      }
    }
  }

  function checkCarouselItemOrder(carouselOrder) {
    debugger
    if (!carouselOrder.pos1) {

    }

    if (!carouselOrder['pos-1']) {

    }
  }

  const animations =  {
    left: {
      in: SlideAnimations.SlideInLeft
    },
    left: {
      out: SlideAnimations.SlideOutLeft,
      duration_out: 1
    },
    right: {
      in: SlideAnimations.SlideInRight
    },
    right: {
      out: SlideAnimations.SlideOutRight,
      duration_out: 1
    }
  }

  function handleLeftArrowClick() {
    console.log(prevCarouselOrder);
    console.log(carouselOrder);
    const newCarouselOrder = {}

    for (let key in carouselOrder) {
      // newCarouselOrder[key] = Object.hasValues carousel[key] + 1;
    }
    // if ()
    debugger
    // setCarousel(newCarouselOrder);
    // debugger
  }

  // useEffect( () => {
  //   children = children.map( (child, idx) => {
  //     // const initialItem = 
  //     if (initialItemIndex !== prevInitialItemIndex && idx === initialItemIndex) {
  //       debugger
  //     }
  //     return !child.props.carouselItem ? child : React.cloneElement(child, { [`pos${idx}`] : carouselOrder[`pos${idx}`] } )
  //   });
  //   debugger
  // }, [carouselOrder]);

  // useEffect( () => {
  //   if (initialItemIndex) {
  //     debugger

  //     setCarouselOrder()
  //   }
  // }, [initialValue]);
  

  return (
    <Flex>
      <BoxAnimated
        id="leftButton"
        isA="button"
        border="solid black"
        borderWidth="0 3px 3px 0"
        display="inline-block"
        padding="3px"
        transform="rotate(135deg)"
        cursor="pointer"
        onClick={handleLeftArrowClick}
        //disabled={true}
      >
      </BoxAnimated>
      {children}
    </Flex>
  );
};

export default Carousel;