import React, { useState, useEffect, Fragment } from "react";
import { useSwipeable } from "react-swipeable";

import { Div, Li, Ul, FlexUl, Span } from "@cbryant24/styled-react";

import { usePrev, useWindowSize } from "../../hooks";

import Icon from "./icons";

//TODO: possible use npm library https://www.npmjs.com/package/html-to-image for image of component for carousel indicator

const InfiniteCarousel = ({
  children,
  carouselStyle,
  carouselItemStyle,
  initialSlide = 0,
  bp,
  maxItems,
  carouselIndicator,
  carouselIndicatorActiveStyle,
  carouselIndicatorInactiveStyle,
  leftArrowContainerStyle,
  rightArrowContainerStyle,
  arrowStyle,
  displayArrow = true,
  carouselSpeed = 1.5,
  fromScale = `1`,
  toScale = `1`
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlide);
  const [carouselTranslateVals, setCarouselTranslateVals] = useState(null);
  const [visibleCarouselCount, setVisibleCarouselCount] = useState(null);
  const maxCarouselCount = maxItems || children.length;
  const { width } = useWindowSize();
  const prevActiveSlideIndex = usePrev(activeSlideIndex);
  const {
    arrowColor,
    stroke,
    strokeWidth,
  } = arrowStyle;

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
        : Math.floor(width / bp) || 1;
    return carouselItemsOnScreen;
  }

  ////////////////////////////////////
  // # ::: BUILD CAROUSEL CSS ::: # //
  ////////////////////////////////////
  function createCarouselTranslatVals() {
    if (!visibleCarouselCount) return;

    let i = 0;
    let carouselLengthEnd = children.length - 1;
    const evenVisibleCarouselCount = visibleCarouselCount % 2 === 0;
    const allCarouselItemsVisible = visibleCarouselCount === children.length;

    //DETERMINING HOW MANY SLIDE ITEMS TO THE LEFT AND RIGHT OF ACTIVE SLIDE
    const upperLowerLimit = Math.floor(visibleCarouselCount / 2);

    //FINDING FIRST LOWER AND LAST UPPER SLIDE FOR LOOP DETERMINATION START AND END POINTS
    let lowerLimit = activeSlideIndex - upperLowerLimit;
    const upperLimit = evenVisibleCarouselCount
        ? activeSlideIndex + upperLowerLimit
        : activeSlideIndex + upperLowerLimit + 1,
      carouselPositions = {},
      traverseCarouselUp = prevActiveSlideIndex < activeSlideIndex,
      traverseCarouselDown = prevActiveSlideIndex > activeSlideIndex,
      fromEndCarouselToBeginning =
        prevActiveSlideIndex === carouselLengthEnd && activeSlideIndex === 0,
      fromBeginningCarouselToEnd =
        prevActiveSlideIndex === 0 && activeSlideIndex === carouselLengthEnd;

    //ONLY LOOPS FOR AS MANY VISIBLE CAROUSEL ITEMS ON SCREEN
    //STARTING FROM FIRST ITEM ON LEFT (lowerLimit) UPTO AND NOT INCLUDING LAST ITEM ON RIGHT (upperLimit)
    while (lowerLimit < upperLimit) {
      const lastSlide = i + 1 === visibleCarouselCount;
      const fistSlide = i === 0;
      const { toScale, fromScale } = determineScale(
        lowerLimit,
        traverseCarouselUp,
        traverseCarouselDown,
        fromBeginningCarouselToEnd,
        fromEndCarouselToBeginning
      );

      //FUNCTION TO SET CAROUSEL CSS TRANSFORM TRANSLATE POSITIONS
      const carouselItemTransform = (() => {
        const fromUpperToLower = {
          transform: `translateX(${(i + 1) * bp}px) ${fromScale}`
        };
        const fromLowerToUpper = {
          transform: `translateX(${(i - 1) * bp}px) ${fromScale}`
        };
        const inFromLeft = {
          transform: `translateX(-${10 * bp}px) ${fromScale}`,
          opacity: 0,
          visibility: "hidden"
        };
        const inFromRight = {
          transform: `translateX(${10 * bp}px) ${fromScale}`,
          opacity: 0,
          visibility: "hidden"
        };

        const carouselItemTranslate = {
          animation: {
            in: {
              "0%": fromLowerToUpper,
              "75%": { visibility: "visible", display: "block" },
              "100%": {
                transform: `translateX(${i * bp}px) ${toScale}`,
                opacity: 1
              }
            },
            duration_in: carouselSpeed,
            animation_fill_mode: "forwards"
          }
        };

        /// HANLDE IF ALL CAROUSEL ITEMS ARE ON THE SCREEN
        if (allCarouselItemsVisible) {
          /// ANIMATION/CSS FOR LAST CAROUSEL ITEM GOING TO FRONT IF TRAVERSING UP OR CAROUSEL BEING RESET FROM LAST TO FIRST
          const fromEndToFront = {
            animation: {
              in: {
                "0%": {
                  opacity: 0.5,
                  transform: `translateX(${(visibleCarouselCount - 1) *
                    bp}px) ${fromScale}`
                },
                "30%": {
                  transform: `translateX(${width + bp * 1.5}px)`,
                  opacity: 0
                },
                "55%": { transform: `translateX(-500px)`, opacity: 0 },
                "100%": {
                  transform: `translateX(${i * bp}) ${toScale}`,
                  opacity: 1
                }
              },
              duration_in: carouselSpeed,
              animation_fill_mode: "forwards"
            }
          };

          /// ANIMATION/CSS FOR FIRST CAROUSEL ITEM GOING TO END IF TRAVERSING DOWN OR CAROUSEL BEING RESET FROM FIRST TO LAST
          const fromFrontToEnd = {
            animation: {
              in: {
                "0%": {
                  opacity: 0.5,
                  transform: `translateX(0px) ${fromScale}`
                },
                "30%": {
                  transform: `translateX(-${bp * 1.5}px)`,
                  opacity: 0
                },
                "55%": {
                  transform: `translateX(${width + 2 * bp}px)`,
                  opacity: 0
                },
                "100%": {
                  transform: `translateX(${i * bp}px) ${toScale}`,
                  opacity: 1
                }
              },
              duration_in: carouselSpeed,
              animation_fill_mode: "forwards"
            }
          };

          /// HANDLE CAROUSEL TRAVERSING FROM FIRST ITEM TO LAST ITEM MOVING FIRST SLIDE FROM END TO FROM WHEN ALL CAROUSEL ITEMS ARE VISIBLE
          if (fromBeginningCarouselToEnd) {
            if (fistSlide) {
              return fromEndToFront;
            }
            carouselItemTranslate.animation.in["0%"] = fromLowerToUpper;

            return carouselItemTranslate;
          }

          /// HANDLE CAROUSEL TRAVERSING UP MOVING LAST SLIDE FROM THE FRONT TO END WHEN ALL CAROUSEL ITEMS ARE VISIBLE
          if (traverseCarouselUp) {
            if (lastSlide) {
              return fromFrontToEnd;
            }

            carouselItemTranslate.animation.in["0%"] = fromUpperToLower;
            return carouselItemTranslate;
          }

          // HANDLE CAROUSEL MOVING FROM END CAROUSEL ITEM TO BEGINNING MOVING LAST SLIDE FROM FRONT TO END WHEN ALL CAROUSEL ITEMS ARE VISIBLE
          if (fromEndCarouselToBeginning) {
            if (lastSlide) {
              return fromFrontToEnd;
            }
            carouselItemTranslate.animation.in["0%"] = fromUpperToLower;

            return carouselItemTranslate;
          }

          // HANDLE CAROUSEL TRAVERSING DOWN FOR FIRST SLIDE ITEM TO FRONT FROM END WHEN ALL CAROUSEL ITEMS ARE VISIBLE
          if (traverseCarouselDown) {
            if (fistSlide) {
              return fromEndToFront;
            }

            return carouselItemTranslate;
          }
        }

        //THE CAROUSEL IS GOING FROM THE FIRST ITEM TO THE LAST ITEM REVERSE THE NORMAL TRANSITIONS
        if (fromBeginningCarouselToEnd) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM RIGHT
          if (lastSlide) {
            const outAnimationFromEnd = {
              animation: {
                in: {
                  "0%": { transform: `translateX(${bp * i}px)` },
                  "100%": { transform: `translateX(${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: "forwards"
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

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM LEFT
          if (fistSlide) {
            carouselItemTranslate.animation.in["0%"] = inFromLeft;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in["0%"] = fromLowerToUpper;
          return carouselItemTranslate;
        }

        // HANDLES WHEN CAROUSEL TRAVERSES UP AND ALL CAROUSEL ITEMS ARE NOT VISIBLE
        if (traverseCarouselUp) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (fistSlide) {
            const outAnimationFromStart = {
              animation: {
                in: {
                  "0%": { transform: `translateX(0px)` },
                  "100%": { transform: `translateX(-${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: "forwards"
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
            carouselItemTranslate.animation.in["0%"] = inFromRight;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in["0%"] = fromUpperToLower;
          return carouselItemTranslate;
        }

        //THE CAROUSEL IS GOING FROM THE LAST ITEM TO THE FIRST ITEM REVERSE THE NORMAL TRANSITIONS
        if (fromEndCarouselToBeginning) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
          if (fistSlide) {
            const outAnimationFromStart = {
              animation: {
                in: {
                  "0%": { transform: `translateX(0px)` },
                  "100%": { transform: `translateX(-${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: "forwards"
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
            carouselItemTranslate.animation.in["0%"] = inFromRight;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in["0%"] = fromUpperToLower;
          return carouselItemTranslate;
        }

        if (traverseCarouselDown) {
          if (lastSlide) {
            const outAnimationFromEnd = {
              animation: {
                in: {
                  "0%": { transform: `translateX(${bp * i}px)` },
                  "100%": { transform: `translateX(${bp * 10}px)` }
                },
                duration_in: carouselSpeed,
                animation_fill_mode: "forwards"
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
            carouselItemTranslate.animation.in["0%"] = inFromLeft;
            return carouselItemTranslate;
          }

          if (lastSlide) {
            return carouselItemTranslate;
          }
        }

        return carouselItemTranslate;
      })();

      // IF THERE IS A CHILDREN ITEM FOR THE LEFT ITEM OF THE ACTIVE MIDDLE SLIDE SET IT
      if (children[lowerLimit]) {
        carouselPositions[lowerLimit] = carouselItemTransform;
        lowerLimit++;
        i++;
        continue;
      }

      // IF THERE IS NO RIGHT ITEM IN THE CAROUSEL FOR THE ITEM ON THE RIGHT GET ITEM FROM LEFT SIDE OF ACTIVE MIDDLE SLIDE
      if (lowerLimit >= children.length) {
        carouselPositions[lowerLimit - children.length] = carouselItemTransform;
        carouselLengthEnd--;
        lowerLimit++;
        i++;
        continue;
      }

      // IF THERE IS NO LEFT ITEM IN THE CAROUSEL FOR THE ITEM ON THE LEFT GET ITEM FROM RIGHT SIDE OF ACTIVE MIDDLE SLIDE
      carouselPositions[children.length + lowerLimit] = carouselItemTransform;
      carouselLengthEnd--;
      lowerLimit++;
      i++;
      continue;
    }

    return carouselPositions;
  }

  ////////////////////////////////////////////////////
  // # ::: CREATE FROM/TO CSS TRANSFORM SCALE ::: # //
  ////////////////////////////////////////////////////
  function determineScale(
    lowerLimit,
    traverseCarouselUp,
    traverseCarouselDown,
    fromBeginningCarouselToEnd,
    fromEndCarouselToBeginning
  ) {
    const evenVisibleCarouselCount = visibleCarouselCount % 2 === 0;

    // DEFAULT TRANSFORM SCALE
    const transformScale = {
      fromScale: `scale(${fromScale})`,
      toScale: `scale(${fromScale})`
    };

    // DETERMING IF EVEN AMOUNT OF CAROUSEL IF SO NEED TWO CAROUSEL ITEMS TO BE SCALED FOR FOCUS
    const additionalCarouselItemFocus =
      evenVisibleCarouselCount && visibleCarouselCount > 1;

    // SET ACTIVE SLIDE TO SCALE TO FOCUS
    if (lowerLimit === activeSlideIndex) transformScale.toScale = `scale(${toScale})`;

    // CHECKING IF CAROUSEL INDICATOR HAS BEEN CLICKED MOVING CAROUSEL MORE THAN ONE SPOT
    if (
      prevActiveSlideIndex + 1 !== activeSlideIndex &&
      prevActiveSlideIndex - 1 !== activeSlideIndex &&
      !fromBeginningCarouselToEnd &&
      !fromEndCarouselToBeginning &&
      evenVisibleCarouselCount
    ) {
      if (activeSlideIndex === lowerLimit)
        transformScale.fromScale = `scale(${fromScale})`;

      // SET CAROUSEL ITEM TO THE LEFT OF THE ACTIVE INDEX ITEM TO THE SAME SCALE AS ACTIVE INDEX IF
      // ACTIVE ITEM IF IT ISNT THE FIRST CAROUSEL ITEM DUE TO NO ITEMS TO THE LEFT OF FIRST ITEM
      if (activeSlideIndex !== 0 && lowerLimit === activeSlideIndex - 1) {
        transformScale.fromScale = `scale(${fromScale})`;
        transformScale.toScale = `scale(${toScale})`;
      }

      // SET CAROUSEL ITEM TO THE LEFT OF THE ACTIVE INDEX ITEM TO THE SAME SCALE AS
      // ACTIVE INDEX WHEN FIRST ITEM IS ACTIVE SLIDE THEN SELECT LAST CAROUSEL ITEM
      if (
        activeSlideIndex === 0 &&
        children.length + lowerLimit === children.length - 1
      ) {
        transformScale.fromScale = `scale(${fromScale})`;
        transformScale.toScale = `scale(${toScale})`;
      }

      return transformScale;
    }

    // IF TRAVERSING CAROUSEL FROM BEGINNING TO END, SCALE LAST CAROUSEL
    // ITEM ALONG WITH CAROUSEL ITEM TO LEFT OF LAST CAROUSEL ITEM
    if (fromBeginningCarouselToEnd) {
      if (additionalCarouselItemFocus) {
        // GOING FROM BEGINNING TO END LAST ITEM WAS ALREADY SCALED UP
        if (lowerLimit === activeSlideIndex)
          transformScale.fromScale = `scale(${toScale})`;

        // SCALE UP ITEM TO THE LEFT OF LAST CAROUSEL ITEM
        if (lowerLimit === activeSlideIndex - 1)
          transformScale.toScale = `scale(${toScale})`;
      }
      // SCALE DOWN FIRST CAROUSEL ITEM THAT WAS JUST PREVIOUSLY ACTIVE
      if (prevActiveSlideIndex === lowerLimit - children.length) {
        transformScale.fromScale = `scale(${toScale})`;
        transformScale.toScale = `scale(${fromScale})`;
      }
      return transformScale;
    }

    // IF TRAVERSING CAROUSEL FROM END TO BEGINNING, SCALE FIRST CAROUSEL ITEM ALONG WITH LAST CAROUSEL ITEM
    if (fromEndCarouselToBeginning) {
      if (additionalCarouselItemFocus) {
        // DETERMINE IF LAST CAROUSEL ITEM THEN KEEP FOCUS SINCE IT WAS PREVIOUSLY SCALED UP
        if (children.length + lowerLimit === children.length - 1) {
          transformScale.fromScale = `scale(${toScale})`;
          transformScale.toScale = `scale(${toScale})`;
        }
      }

      // FIND THE LAST CAROUSEL ITEM AND SET TO SCALE DOWN
      if (prevActiveSlideIndex === children.length + lowerLimit)
        transformScale.fromScale = `scale(${toScale})`;

      return transformScale;
    }

    if (traverseCarouselUp) {
      if (additionalCarouselItemFocus) {
        // SETTING SCALE TO SAME DUE TO ALREADY BEING PREVIOUSLY SCALED FOCUS
        if (prevActiveSlideIndex === lowerLimit) {
          transformScale.toScale = `scale(${toScale})`;
          transformScale.fromScale = `scale(${toScale})`;
        }

        if (prevActiveSlideIndex === 0) {
          // SELECTING LAST CAROUSEL ITEM DUE TO IT BEING ITEM TO LEFT OF
          // FIRST CAROUSEL  ITEM TO SCALE IT DOWN FROM BEING PREVIOUSLY IN FOCUS
          if (children.length + lowerLimit === children.length - 1)
            transformScale.fromScale = `scale(${toScale})`;
        }

        // SELECTING ITEM TO LEFT OF PREVIOUSLY FOCUSED ACTIVE CAROUSEL ITEM FOR SCALING DOWN
        if (prevActiveSlideIndex - 1 === lowerLimit)
          transformScale.fromScale = `scale(${toScale})`;
      }

      // TRAVERSING UP PREVIOUSLY ACTIVE ITEM IS NOW SCALED
      // DOWN TO LEFT OF CURRENT ACTIVE CAROUSEL ITEM
      if (lowerLimit === prevActiveSlideIndex)
        transformScale.fromScale = `scale(${toScale})`;

      return transformScale;
    }

    if (traverseCarouselDown) {
      if (additionalCarouselItemFocus) {
        // TRAVERSING CAROUSEL DOWN CURRENTLY ACTIVE ITEM WAS ALREADY SCALED UP
        if (lowerLimit === activeSlideIndex)
          transformScale.fromScale = `scale(${toScale})`;

        // SCALE UP ITEM TO RIGHT OF ACTIVEL CAROUSEL ITEM
        if (lowerLimit + 1 === activeSlideIndex)
          transformScale.toScale = `scale(${toScale})`;
      }

      // TRAVERSING DOWN PREVIOUSLY ACTIVE ITEM IS NOW SCALED
      // DOWN TO RIGHT OF CURRENT ACTIVE CAROUSEL ITEM
      if (prevActiveSlideIndex === lowerLimit) {
        transformScale.fromScale = `scale(${toScale})`;
        transformScale.toScale = `scale(${fromScale})`;
      }

      return transformScale;
    }

    // SETTING CAROUSEL FOR INITIAL VIEW

    // IF ACTIVE CAROUSEL ITEM ISNT 0 SET THE CAROUSEL ITEM TO LEFT TO SCALE UP
    if (
      additionalCarouselItemFocus &&
      activeSlideIndex !== 0 &&
      lowerLimit === activeSlideIndex - 1
    )
      transformScale.toScale = `scale(${toScale})`;

    // IF ACTIVE CAROUSEL ITEM IS 0 SET THE LAST CAROUSEL ITEM TO SCALE UP
    if (
      additionalCarouselItemFocus &&
      activeSlideIndex === 0 &&
      children.length + lowerLimit === children.length - 1
    )
      transformScale.toScale = `scale(${toScale})`;

    // SET FROM SCALE OF PREVIOUSLY ACTIVE ITEM TO FOCUS WHETHER LEAVING OR STAYING IN FOCUS
    if (lowerLimit === prevActiveSlideIndex)
      transformScale.fromScale = `scale(${toScale})`;

    // SET CURRENT ACTIVE ITEM FROM FOCUS TO FOCUSED SCALE IF IT WAS PREVIOUSLY ACTIVE ITEM
    if (
      additionalCarouselItemFocus &&
      lowerLimit === activeSlideIndex &&
      prevActiveSlideIndex === activeSlideIndex - 1
    )
      transformScale.fromScale = `scale(${toScale})`;

    return transformScale;
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
    if (carouselTranslateVals[index])
      return {
        ...carouselTranslateVals[index],
        width: `${Math.floor(100 / visibleCarouselCount)}%`,
        height: "auto"
      };
    return {
      visibility: "hidden",
      height: "0px",
      width: "0px"
    };
  }

  if (
    visibleCarouselCount !== null &&
    carouselCountToDisplay() !== visibleCarouselCount
  ) {
    setVisibleCarouselCount(carouselCountToDisplay());
  }

  function createCarouselSlide(index) {
    const carouselItemPosition = getTranslatePosition(index);
    return (
      <Li
        key={index}
        id={`carousel-item-${index}`}
        gridRow="1 / span 1"
        gridColumn="1 / span 1"
        transition={`transform ${carouselSpeed}s`}
        {...carouselItemStyle}
        {...carouselItemPosition}
      >
        {children[index]}
      </Li>
    );
  }

  function createCarouselIndicator(index) {
    const style =
      index === activeSlideIndex
        ? carouselIndicatorActiveStyle
        : carouselIndicatorInactiveStyle;

    return (
      <Li key={index} {...style} onClick={() => goToSlide(index)}>
        {children[index].props.carouselIndicatorName}
      </Li>
    );
  }

  if (!carouselTranslateVals) return <Div></Div>;

  return (
    <Fragment>
      {carouselIndicator ? (
        <Div id="styled-react-carousel-indicator" my="2em">
          <FlexUl
            height="auto"
            width="auto"
            flexWrap="wrap"
            justifyContent="center"
          >
            {children.map((item, idx) => createCarouselIndicator(idx))}
          </FlexUl>
        </Div>
      ) : (
        ""
      )}
      <div id="swippeable" {...handlers}>
        <Div position="relative" {...carouselStyle}>
          {displayArrow ? (
            <Span {...leftArrowContainerStyle} onClick={goToPrevSlide}>
              <Icon
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={arrowColor}
                name="back"
              />
            </Span>
          ) : (
            ""
          )}
          <Ul
            id="styled-react-carousel-ul"
            display="grid"
            gridTemplateRows="100%"
            gridColumnRows="100%"
            width={`${visibleCarouselCount * bp}px`}
            margin="0 auto"
          >
            {children.map((item, idx) => createCarouselSlide(idx))}
          </Ul>
          {displayArrow ? (
            <Span {...rightArrowContainerStyle} onClick={goToNextSlide}>
              <Icon
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={arrowColor}
                name="next"
              />
            </Span>
          ) : (
            ""
          )}
        </Div>
      </div>
    </Fragment>
  );
};

export default InfiniteCarousel;
