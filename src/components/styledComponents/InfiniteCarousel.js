import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Div, Li, Ul, FlexUl, Span } from '@cbryant24/styled-react';

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
  maxItems,
  carouselIndicator,
  carouselIndicatorStyle
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlide);
  const [carouselTranslateVals, setCarouselTranslateVals] = useState(null);
  const [visibleCarouselCount, setVisibleCarouselCount] = useState(null);
  const [maxCarouselCount, setMaxCarouselCount] = useState(
    maxItems || children.length
  );
  const { width } = useWindowSize();
  const prevActiveSlideIndex = usePrev(activeSlideIndex);
  const carouselSpeed = 1.5;

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
    const traverseCarouselUp = prevActiveSlideIndex < activeSlideIndex;
    const traverseCarouselDown = prevActiveSlideIndex > activeSlideIndex;
    const fromBeginningCarouselToEnd =
      prevActiveSlideIndex === carouselLengthEnd && activeSlideIndex === 0;
    const fromEndCarouselToBeginning =
      prevActiveSlideIndex === 0 && activeSlideIndex === carouselLengthEnd;

    while (lowerLimit < upperLimit) {
      const scale = lowerLimit === activeSlideIndex ? 1.2 : 1.0;
      const lastSlide = i + 1 === visibleCarouselCount;
      const fistSlide = i === 0;
      //FUNCTION TO SET CAROUSEL TRANSLATE POSITIONS
      const carouselItemTransform = (() => {
        const fromUpperToLower = {
          transform: `translateX(${(i + 1) * bp}px) scale(1.0)`
        };
        const fromLowerToUpper = {
          transform: `translateX(${(i - 1) * bp}px) scale(1.0)`
        };
        const inFromLeft = {
          transform: `translateX(-${10 * bp}px) scale(1.0)`,
          opacity: 0,
          visibility: 'hidden'
        };
        const inFromRight = {
          transform: `translateX(${10 * bp}px) scale(1.0)`,
          opacity: 0,
          visibility: 'hidden'
        };

        const carouselItemTranslate = {
          animation: {
            in: {
              '0%': fromLowerToUpper,
              '75%': { visibility: 'visible' },
              '100%': {
                transform: `translateX(${i * bp}px) scale(${scale})`,
                opacity: 1
              }
            },
            duration_in: carouselSpeed,
            animation_fill_mode: 'forwards'
          }
        };

        /// HANLDE IF ALL CAROUSEL ITEMS ARE ON THE SCREEN
        if (visibleCarouselCount === children.length) {
          /// HANDLE LAST CAROUSEL ITEM GOING TO FRONT IF TRAVERSING UP OR CAROUSEL BEING RESET  FROM LAST TO FIRST
          const fromEndToFront = {
            animation: {
              in: {
                '0%': {
                  opacity: 0.5,
                  transform: `translateX(${(visibleCarouselCount - 1) * bp}px)`
                },
                '30%': {
                  transform: `translateX(${width + bp * 1.5}px)`,
                  opacity: 0
                },
                '55%': { transform: `translateX(-500px)`, opacity: 0 },
                '100%': { transform: `translateX(${i * bp})`, opacity: 1 }
              },
              duration_in: carouselSpeed,
              animation_fill_mode: 'forwards'
            }
          };

          /// HANDLE FIRST CAROUSEL ITEM GOING TO END IF TRAVERSING DOWN OR CAROUSEL BEING RESET FROM FIRST TO LAST
          const fromFrontToEnd = {
            animation: {
              in: {
                '0%': {
                  opacity: 0.5,
                  transform: `translateX(0px)`
                },
                '30%': {
                  transform: `translateX(-${bp * 1.5}px)`,
                  opacity: 0
                },
                '55%': {
                  transform: `translateX(${width + 2 * bp}px)`,
                  opacity: 0
                },
                '100%': { transform: `translateX(${i * bp}px)`, opacity: 1 }
              },
              duration_in: carouselSpeed,
              animation_fill_mode: 'forwards'
            }
          };

          /// HANDLE CAROUSEL TRAVERSING DOWN IF CAROUSEL IS GOING FROM LAST ITEM TO FIRST
          if (fromEndCarouselToBeginning) {
            if (fistSlide) {
              return fromEndToFront;
            }
            carouselItemTranslate.animation.in.from = fromLowerToUpper;

            return carouselItemTranslate;
          }

          /// HANDLE CAROUSEL TRAVERSING UP
          if (traverseCarouselUp) {
            if (lastSlide) {
              return fromFrontToEnd;
            }

            carouselItemTranslate.animation.in.from = fromUpperToLower;
            return carouselItemTranslate;
          }

          if (fromBeginningCarouselToEnd) {
            if (lastSlide) {
              return fromFrontToEnd;
            }
            carouselItemTranslate.animation.in.from = fromUpperToLower;

            return carouselItemTranslate;
          }

          if (traverseCarouselDown) {
            if (fistSlide) {
              return fromEndToFront;
            }

            return carouselItemTranslate;
          }
        }
        //THE CAROUSEL IS GOING FROM THE FIRST ITEM TO THE LAST ITEM REVERSE THE NORMAL TRANSITIONS
        if (fromEndCarouselToBeginning) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (lastSlide) {
            const outAnimationFromEnd = {
              animation: {
                in: {
                  '0%': { transform: `translateX(${bp * i}px)` },
                  '100%': { transform: `translateX(${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: 'forwards'
              }
            };

            if (lowerLimit >= children.length) {
              carouselPositions[
                lowerLimit - children.length + 1
              ] = outAnimationFromEnd;
            } else {
              if (children[lowerLimit + 1]) {
                carouselPositions[lowerLimit + 1] = outAnimationFromEnd;
              } else {
                carouselPositions[
                  lowerLimit - children.length + 1
                ] = outAnimationFromEnd;
              }
            }
          }

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (fistSlide) {
            carouselItemTranslate.animation.in.from = inFromLeft;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in.from = fromLowerToUpper;
          return carouselItemTranslate;
        }

        if (prevActiveSlideIndex < activeSlideIndex) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (fistSlide) {
            const outAnimationFromStart = {
              animation: {
                in: {
                  '0%': { transform: `translateX(0px)` },
                  '100%': { transform: `translateX(-${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: 'forwards'
              }
            };

            if (children[lowerLimit - 1]) {
              carouselPositions[lowerLimit - 1] = outAnimationFromStart;
            } else {
              carouselPositions[
                children.length + lowerLimit - 1
              ] = outAnimationFromStart;
            }
          }

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (lastSlide) {
            carouselItemTranslate.animation.in.from = inFromRight;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in.from = fromUpperToLower;
          return carouselItemTranslate;
        }

        //THE CAROUSEL IS GOING FROM THE LAST ITEM TO THE FIRST ITEM REVERSE THE NORMAL TRANSITIONS
        if (fromBeginningCarouselToEnd) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (fistSlide) {
            const outAnimationFromStart = {
              animation: {
                in: {
                  '0%': { transform: `translateX(0px)` },
                  '100%': { transform: `translateX(-${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: 'forwards'
              }
            };
            if (children[lowerLimit - 1]) {
              carouselPositions[lowerLimit - 1] = outAnimationFromStart;
            } else {
              carouselPositions[
                children.length + lowerLimit - 1
              ] = outAnimationFromStart;
            }
          }

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (lastSlide) {
            carouselItemTranslate.animation.in.from = inFromRight;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in.from = fromUpperToLower;
          return carouselItemTranslate;
        }

        if (traverseCarouselDown) {
          if (lastSlide) {
            const outAnimationFromEnd = {
              animation: {
                in: {
                  '0%': { transform: `translateX(${bp * i}px)` },
                  '100%': { transform: `translateX(${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: 'forwards'
              }
            };

            if (lowerLimit >= children.length - 1) {
              carouselPositions[
                lowerLimit - children.length + 1
              ] = outAnimationFromEnd;
            } else {
              carouselPositions[lowerLimit + 1] = outAnimationFromEnd;
            }
          }

          if (fistSlide) {
            carouselItemTranslate.animation.in.from = inFromLeft;
            return carouselItemTranslate;
          }

          if (lastSlide) {
            return carouselItemTranslate;
          }
        }
        return carouselItemTranslate;
      })();

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

  function goToSlide(index) {
    setActiveSlideIndex(index);
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

  function getTranslatePosition(index) {
    if (carouselTranslateVals[index]) return carouselTranslateVals[index];

    return {
      visibility: 'hidden',
      transform:
        index < activeSlideIndex ? 'translateX(-1000px)' : 'translate(2000px)',
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
        transition={`transform ${carouselSpeed}s`}
        width={bp}
        height={bp}
        {...carouselItemStyle}
        {...carouselItemPosition}
      >
        {children[index]}
      </Li>
    );
  }

  function createCarouselIndicator(index) {
    return (
      <Li {...carouselIndicatorStyle} onClick={() => goToSlide(index)}>
        <Div
          pseudo="true"
          transform="translateY(5px)"
          transition="1s all"
          opacity="0"
          py={[1]}
          textAlign="center"
          hover={{
            transform: 'translateY(0px)',
            height: '100%',
            width: '100%',
            visibility: 'visible',
            opacity: '1'
          }}
        >
          {index}
        </Div>
      </Li>
    );
  }
  debugger;
  if (!carouselTranslateVals) return <Div></Div>;
  debugger;
  return (
    <div {...handlers}>
      <Div {...carouselStyle}>
        <Span onClick={goToPrevSlide}>Left</Span>
        <Ul
          id="styled-react-carousel-ul"
          display="grid"
          gridTemplateRows="100%"
          gridColumnRows="100%"
          width="100%"
        >
          {children.map((item, idx) => carouselSlide(idx))}
        </Ul>
        <Span onClick={goToNextSlide}>Right</Span>
        {carouselIndicator ? (
          <FlexUl id="styled-react-carousel-indicator">
            {children.map((item, idx) => createCarouselIndicator(idx))}
          </FlexUl>
        ) : (
          ''
        )}
      </Div>
    </div>
  );
};

export default InfiniteCarousel;
