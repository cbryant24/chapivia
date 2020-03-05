import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Div, Li, Ul } from '@cbryant24/styled-react';

import { usePrev, useWindowSize } from '../../hooks';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const InfiniteCarousel = ({
  children,
  carouselStyle,
  carouselItemStyle,
  initialSlide = 0,
  bp,
  maxItems
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlide);
  const [carouselTranslateVals, setCarouselTranslateVals] = useState(null);
  const [visibleCarouselCount, setVisibleCarouselCount] = useState(null);
  const [maxCarouselCount, setMaxCarouselCount] = useState(
    maxItems || children.length
  );
  const { width } = useWindowSize();
  const prevActiveSlideIndex = usePrev(activeSlideIndex);

  useEffect(() => {
    setVisibleCarouselCount(carouselCountToDisplay());
  }, []);

  useEffect(() => {
    setCarouselTranslateVals(createCarouselTranslatVals());
  }, [activeSlideIndex, visibleCarouselCount]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToPrevSlide(),
    onSwipedRight: () => goToNextSlide(),
    preventDefaultTouchmoveEvent: true
  });

  // ;
  function carouselCountToDisplay() {
    const carouselItemsOnScreen =
      maxCarouselCount < Math.floor(width / bp)
        ? maxCarouselCount
        : Math.floor(width / bp) - 1;
    return carouselItemsOnScreen;
  }

  function createCarouselTranslatVals() {
    if (!visibleCarouselCount) return;

    let i = 0;
    let carouselLengthEnd = children.length - 1;
    const upperLowerLimit = Math.floor(visibleCarouselCount / 2);

    let lowerLimit = activeSlideIndex - upperLowerLimit;
    const upperLimit =
      visibleCarouselCount % 2 === 0
        ? activeSlideIndex + upperLowerLimit
        : activeSlideIndex + upperLowerLimit + 1;
    const carouselPositions = {};
    const fromBeginningCarouselToEnd =
      prevActiveSlideIndex === carouselLengthEnd && activeSlideIndex === 0;
    const fromEndCarouselToBeginning =
      prevActiveSlideIndex === 0 && activeSlideIndex === carouselLengthEnd;

    // debugger;
    while (lowerLimit < upperLimit) {
      const scale = lowerLimit === activeSlideIndex ? 1.2 : 1.0;
      //FUNCTION TO SET CAROUSEL TRANSLATE POSITIONS
      const carouselItemTransform = (() => {
        const fromUpperToLower = { transform: `translateX(${(i + 1) * bp}px) scale(1.0)` };
        const fromLowerToUpper = { transform: `translateX(${(i - 1) * bp}px) scale(1.0)` };
        const inFromLeft = { transform: `translateX(-${10 * bp}px) scale(1.0)` };
        const inFromRight = { transform: `translateX(${10 * bp}px) scale(1.0)` };

        const carouselItemTranslate = {
          animation: {
            in: {
              from: fromLowerToUpper,
              to: { transform: `translateX(${i * bp}px) scale(${scale})` }
            },
            duration_in: 2,
            animation_fill_mode: 'forwards'
          }
        };

        if (visibleCarouselCount === children.length) {
          debugger
          if (prevActiveSlideIndex < activeSlideIndex) {
            if (i === 0) {
              const fromEndToFront = {
                  animation: {
                    in: {
                      '0%': { visibility: 'hidden'},
                      '20%': { transform: `translateX(${(visibleCarouselCount - 1) * bp}px)`},
                      '50%': { transform: `translateX(1500px)`},
                      '55%': { transform: `translateX(-500px)`},
                      '100%': { transform: `translateX(${i * bp})`}
                      // '0%': { visibility: 'visible'},
                      // '100%': { visibility: 'hidden'},
                    },
                    duration_in: 10,
                    animation_fill_mode: 'forwards'
                }
              }
              return fromEndToFront;
            }
          }

          if (prevActiveSlideIndex > activeSlideIndex) {
            debugger
            if (i + 1 === visibleCarouselCount) {
              const fromFrontToEnd = {
                animation: {
                  in: {
                    '0%': { transform: `translateX(0px)`},
                    '50%': { transform: `translateX-(500px)`},
                    '51%': { visibility: 'hidden'},
                    '55%': { transform: `translateX(500px)`, visibility: 'hidden'},
                    '100%': { transform: `translateX(${i * bp}px)`, visibility: 'visible'}
                  },
                  duration_in: 2,
                  animation_fill_mode: 'forwards'
                }
              }
              return fromFrontToEnd;
            }
          }


          return { transform: `translateX(${i * bp}px) scale(${scale})` }
        }
        //THE CAROUSEL IS GOING FROM THE FIRST ITEM TO THE LAST ITEM REVERSE THE NORMAL TRANSITIONS
        if (prevActiveSlideIndex < activeSlideIndex && fromEndCarouselToBeginning) {
          debugger

          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (i + 1 === visibleCarouselCount) {
            const outAnimationFromEnd = {
              animation: {
                in: {
                  from: { transform: `translateX(${bp * i}px)` },
                  to: { transform: `translateX(${bp * 10}px)` }
                },
                duration_in: 2,
                animation_fill_mode: 'forwards'
              }
            };
            // if ()
            if (lowerLimit >= children.length) {
              carouselPositions[
                lowerLimit - children.length + 1
              ] = outAnimationFromEnd;
            } else {
              if (children[lowerLimit + 1]) {
                carouselPositions[lowerLimit + 1] = outAnimationFromEnd;
              } else {
                carouselPositions[lowerLimit - children.length + 1] = outAnimationFromEnd;
              }
            }
          }

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (i === 0) {
            carouselItemTranslate.animation.in.from = inFromLeft;
            return carouselItemTranslate;
          }


          carouselItemTranslate.animation.in.from = fromLowerToUpper;
          return carouselItemTranslate;
        }

        if (prevActiveSlideIndex < activeSlideIndex) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (i === 0) {
            const outAnimationFromStart = {
              animation: {
                in: {
                  from: { transform: `translateX(0px)` },
                  to: { transform: `translateX(-${bp * 10}px)` }
                },
                duration_in: 2,
                animation_fill_mode: 'forwards'
              }
            };

            if(children[lowerLimit - 1]) {
              carouselPositions[lowerLimit - 1] = outAnimationFromStart;
            } else {
              carouselPositions[
                children.length + lowerLimit - 1
              ] = outAnimationFromStart;
            }
          }

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (i + 1 === visibleCarouselCount) {
            carouselItemTranslate.animation.in.from = inFromRight;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in.from = fromUpperToLower;
          return carouselItemTranslate;
        }

        //THE CAROUSEL IS GOING FROM THE LAST ITEM TO THE FIRST ITEM REVERSE THE NORMAL TRANSITIONS
        if (prevActiveSlideIndex > activeSlideIndex && fromBeginningCarouselToEnd) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (i === 0) {
            const outAnimationFromStart = {
              animation: {
                in: {
                  from: { transform: `translateX(0px)` },
                  to: { transform: `translateX(-${bp * 10}px)` }
                },
                duration_in: 2,
                animation_fill_mode: 'forwards'
              }
            };
            // if ()
            if(children[lowerLimit - 1]) {
              carouselPositions[lowerLimit - 1] = outAnimationFromStart;
            } else {
              carouselPositions[
                children.length + lowerLimit - 1
              ] = outAnimationFromStart;
            }
          }

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (i + 1 === visibleCarouselCount) {
            carouselItemTranslate.animation.in.from = inFromRight;
            return carouselItemTranslate;
          }


          carouselItemTranslate.animation.in.from = fromUpperToLower;
          return carouselItemTranslate;
        }

        if (prevActiveSlideIndex > activeSlideIndex) {
          if (i + 1 === visibleCarouselCount) {
            const outAnimationFromEnd = {
              animation: {
                in: {
                  from: { transform: `translateX(${bp * i}px)` },
                  to: { transform: `translateX(${bp * 10}px)` }
                },
                duration_in: 2,
                animation_fill_mode: 'forwards'
              }
            };
            // if ()
            debugger
            if (lowerLimit >= children.length - 1) {
              carouselPositions[
                lowerLimit - children.length + 1
              ] = outAnimationFromEnd;
            } else {
              carouselPositions[lowerLimit + 1] = outAnimationFromEnd;
            }
          }

          if (i === 0) {
            carouselItemTranslate.animation.in.from = inFromLeft;
            return carouselItemTranslate;
          }

          if (i + 1 === visibleCarouselCount) {
            // carouselItemTranslate.animation.in.from = outFromRight;
            return carouselItemTranslate;
          }
        }
        return carouselItemTranslate;
      })();

      debugger
      if (children[lowerLimit]) {
        carouselPositions[lowerLimit] = carouselItemTransform;
        lowerLimit++;
        i++;
        continue;
      }

      if (lowerLimit >= children.length) {
        carouselPositions[lowerLimit - children.length] = carouselItemTransform;
        carouselLengthEnd--;
        lowerLimit++;
        i++;
        continue;
      }

      carouselPositions[children.length + lowerLimit] = carouselItemTransform;
      carouselLengthEnd--;
      lowerLimit++;
      i++;
      continue;
    }

    return carouselPositions;
  }

  function goToSlide() {
    setActiveSlideIndex(3);
  }

  function goToPrevSlide(e) {
    let slide = activeSlideIndex;
    let slidesLength = children.length;

    if (slide < 1) {
      slide = slidesLength;
    }

    --slide;

    setActiveSlideIndex(slide);
  }

  function goToNextSlide(e) {
    let slide = activeSlideIndex;
    let slidesLength = children.length - 1;

    if (slide === slidesLength) {
      slide = -1;
    }

    ++slide;

    setActiveSlideIndex(slide);
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
    // debugger;
    if (carouselTranslateVals[index]) return carouselTranslateVals[index];

    return {
      visibility: 'hidden',
      height: 0,
      width: 0
    };
  }

  // ;
  if (
    visibleCarouselCount !== null &&
    carouselCountToDisplay() !== visibleCarouselCount
  ) {
    setVisibleCarouselCount(carouselCountToDisplay());
  }

  function carouselSlide(index) {
    const carouselItemPosition = getTranslatePosition(index);
    return (
      <Li
        id={`carousel-item-${index}`}
        gridRow="1 / span 1"
        gridColumn="1 / span 1"
        transition="transform 1s"
        width={bp}
        height={bp}
        {...carouselItemStyle}
        {...carouselItemPosition}
      >
        {children[index]}
      </Li>
    );
  }

  if (!carouselTranslateVals) return <Div></Div>;

  return (
    <div {...handlers}>
      <Div {...carouselStyle}>
        <Ul
          id="styled-react-carousel-ul"
          display="grid"
          gridTemplateRows="100%"
          gridColumnRows="100%"
          width="100%"
        >
          {children.map((item, idx) => carouselSlide(idx))}
        </Ul>
      </Div>
    </div>
  );
};

export default InfiniteCarousel;
