import React, { useState, useEffect } from 'react';
import { Flex, BoxAnimated, SlideAnimations, BoxAll } from './element';
import { usePrev } from '../hooks';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const Carousel = ({ children, type, animationIn, animationOut, infinite, ...props }) => {
  // const [ leftDisabled, setLeftDisabled ]           = useState(false);
  // const [ rightDisabled, setRightDisabled ]         = useState(false);
  // const [ initialItemIndex, setInitialItemIndex ]   = useState(setInitialItem);
  // const [ carouselOrder, setCarouselOrder ]         = useState(setInitialCarousel);
  // const prevInitialItemIndex                        = usePrev(initialItemIndex);
  // const prevCarouselOrder                           = usePrev(carouselOrder);
  // let carouselItems                                 = [];
  // let nonCarouselItems                              = [];
  
  const [ activeIndex, setActiveIndex ] = useState(0);
  const carouselItems                   = children.filter( child => child.props.carouselItem)

  function goToSlide(index) {
    setActiveIndex(index);
  }

  function goToPrevSlide(e) {
    e.preventDefault();

    let index = activeIndex;
    // let { slides } = this.props;
    let slidesLength = carouselItems.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    setActiveIndex(index);
  }

  function goToNextSlide(e) {
    e.preventDefault();

    let index = activeIndex;
    // let { slides } = this.props;
    let slidesLength = carouselItems.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    setActiveIndex(index);
  }



  // function carouselLeftArrow(e) {
  //   return (
  //     <div
  //       onClick={ e => goToPrevSlide(e)}
  //     >
  //       Left Arrow
  //     </div>
  //   )
  // }

  function carouselRightArrow(e) {
    return (
      <div
        onClick={ e => goToNextSlide(e)}
      >
        Right Arrow
      </div>
    )
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

  function carouselSlide(index) {
    return (
      <BoxAll
        isA="li"
        width="100%"
      >
        <BoxAll
          height="20rem"
          width={[1]}
          //mx="2rem"
          border={`2px solid ${index === activeIndex ? 'red' : 'white'}`}
          className={ index === activeIndex ? "active" : "non-active" }
        >
          {`carousel Item ${index}`}
        </BoxAll>
      </BoxAll>
    )
  }

  return (
    <BoxAll
      id="carousel-box"
      display="flex"
      flexWrap="wrap"
      overflow="hidden"
    >
      <BoxAll
        onClick={ e => goToPrevSlide(e) }
      >
        Left Arrow
      </BoxAll>
      <BoxAll
        id="carousel-ul"
        isA="ul"
        display="flex"
        //width={[1]}
      >
        { carouselItems.map( (item, idx) => (carouselSlide(idx))) }
      </BoxAll>
      <BoxAll
        isA="ul"
        display="flex"
      >
        { carouselItems.map( (item, idx) => (carouselIndicator(idx))) }
      </BoxAll>
      <BoxAll
        onClick={ e => goToNextSlide(e) }
      >
        Right Arrow
      </BoxAll>
    </BoxAll>
  )

  // function setInitialItem() {
  //   let initialItemIndex = 0;
  //   // create carousel by filtering out children that are not carousel items to be displayed in carousel
  //   carouselItems   = children.filter( child => child.props.carouselItem)
  //   nonCarouselItems = children.filter( child => !child.props.carouselItem)
  //   carouselItems.some( (child, idx) => {
  //     if (child.props.initialItem) {
  //       initialItemIndex = idx;

  //       return true;
  //     }
  //   });

  //   return initialItemIndex;
  // }

  // function setInitialCarousel() {
  //   const carouselPosition  = {};
    
  //   if (infinite) {
  //     if (initialItemIndex > 0) {
  //       const carouselIndexStart = initialItemIndex * -1;
  //       const carouselOrder =  carouselItems.reduce((o, item, idx) => ({ ...o, [`${idx + carouselIndexStart}`]: item[initialItemIndex - idx]}), {});
  //       console.log(carouselOrder)
  //       debugger
  //       checkCarouselItemOrder(carouselOrder);
  //     }
  //   }
  // }

  // useEffect( () => {
  //   if (infinite) {
  //     // carouselItems = 
  //   }
  // }, [])

  // function sortCarouselOrder(initial) {
  //   const newCarouselOrder = [];

  //   if (initial) {
  //     const initialIndex = carouselItems.findIndex( item => item.initial );

  //     if (infinite) {
  //       while(carouselItems.length > 0) {

  //       }
  //     }
  //   }
  // }

  // function checkCarouselItemOrder(carouselOrder) {
  //   debugger
  //   if (!carouselOrder.pos1) {
      
  //   }

  //   if (!carouselOrder['pos-1']) {

  //   }
  // }

  // const animations =  {
  //   left: {
  //     in: SlideAnimations.SlideInLeft
  //   },
  //   left: {
  //     out: SlideAnimations.SlideOutLeft,
  //     duration_out: 1
  //   },
  //   right: {
  //     in: SlideAnimations.SlideInRight
  //   },
  //   right: {
  //     out: SlideAnimations.SlideOutRight,
  //     duration_out: 1
  //   }
  // }

  // function handleLeftArrowClick() {
  //   console.log(prevCarouselOrder);
  //   console.log(carouselOrder);
  //   const newCarouselOrder = {}

  //   for (let key in carouselOrder) {
  //     // newCarouselOrder[key] = Object.hasValues carousel[key] + 1;
  //   }
  //   // if ()
  //   debugger
  //   // setCarousel(newCarouselOrder);
  //   // debugger
  // }

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
  

  // return (
  //   <Flex>
  //     <BoxAnimated
  //       id="leftButton"
  //       isA="button"
  //       border="solid black"
  //       borderWidth="0 3px 3px 0"
  //       display="inline-block"
  //       padding="3px"
  //       transform="rotate(135deg)"
  //       cursor="pointer"
  //       onClick={handleLeftArrowClick}
  //       //disabled={true}
  //     >
  //     </BoxAnimated>
  //     {children}
  //   </Flex>
  // );
};

export default Carousel;