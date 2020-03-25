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
  carouselSpeed = 1.5
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlide);
  const [carouselTranslateVals, setCarouselTranslateVals] = useState(null);
  const [visibleCarouselCount, setVisibleCarouselCount] = useState(null);
  const [maxCarouselCount, setMaxCarouselCount] = useState(
    maxItems || children.length
  );
  const { width } = useWindowSize();
  const prevActiveSlideIndex = usePrev(activeSlideIndex);
  const {
    arrowColor,
    stroke,
    strokeWidth,
    ...arrowContainerStyle
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

    //FINDING FIRST LOWER AND LAST UPPER SLIDE FOR LOOP DETERMINATION END POINTS
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

    // debugger;
    //ONLY LOOPS FOR AS MANY VISIBLE CAROUSEL ITEMS ON SCREEN STARTING FROM FIRST ITEM ON LEFT
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
      // const toScale =
      //   lowerLimit === activeSlideIndex ||
      //   (evenVisibleCarouselCount &&
      //     visibleCarouselCount > 1 &&
      //     activeSlideIndex !== 0 &&
      //     lowerLimit === activeSlideIndex - 1)
      //     ? "scale(1)"
      //     : evenVisibleCarouselCount &&
      //       visibleCarouselCount > 1 &&
      //       activeSlideIndex === 0 &&
      //       children.length + lowerLimit === children.length - 1
      //     ? "scale(1)"
      //     : "scale(.95)";
      // const fromScale =
      //   lowerLimit === prevActiveSlideIndex ||
      //   (evenVisibleCarouselCount &&
      //     visibleCarouselCount > 1 &&
      //     prevActiveSlideIndex !== 0 &&
      //     lowerLimit === activeSlideIndex)
      //     ? "scale(1)"
      //     : evenVisibleCarouselCount &&
      //       visibleCarouselCount > 1 &&
      //       prevActiveSlideIndex === 0 &&
      //       lowerLimit === activeSlideIndex
      //     ? "scale(1)"
      //     : "scale(.95)";
      debugger;
      //FUNCTION TO SET CAROUSEL TRANSLATE POSITIONS
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
          /// HANDLE LAST CAROUSEL ITEM GOING TO FRONT IF TRAVERSING UP OR CAROUSEL BEING RESET  FROM LAST TO FIRST
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

          /// HANDLE FIRST CAROUSEL ITEM GOING TO END IF TRAVERSING DOWN OR CAROUSEL BEING RESET FROM FIRST TO LAST
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

          /// HANDLE CAROUSEL TRAVERSING DOWN IF CAROUSEL IS GOING FROM LAST ITEM TO FIRST
          if (fromBeginningCarouselToEnd) {
            if (fistSlide) {
              return fromEndToFront;
            }
            carouselItemTranslate.animation.in["0%"] = fromLowerToUpper;

            return carouselItemTranslate;
          }

          /// HANDLE CAROUSEL TRAVERSING UP
          if (traverseCarouselUp) {
            if (lastSlide) {
              return fromFrontToEnd;
            }

            carouselItemTranslate.animation.in["0%"] = fromUpperToLower;
            return carouselItemTranslate;
          }

          if (fromEndCarouselToBeginning) {
            if (lastSlide) {
              return fromFrontToEnd;
            }
            carouselItemTranslate.animation.in["0%"] = fromUpperToLower;

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
        if (fromBeginningCarouselToEnd) {
          //SETTING PREVIOUSLY VISIBLE CAROUSEL ITEM TO TRANISITON OUT OF CAROUSEL FROM LEFT
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

          //SETTING PREVIOUSLY UNSEEN CAROUSEL ITEM TO TRANSITION INTO CAROUSEL FROM RIGHT
          if (fistSlide) {
            carouselItemTranslate.animation.in["0%"] = inFromLeft;
            return carouselItemTranslate;
          }

          carouselItemTranslate.animation.in["0%"] = fromLowerToUpper;
          return carouselItemTranslate;
        }

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

  //////////////////////////////////////
  // # ::: CREATE FROM/TO SCALE ::: # //
  //////////////////////////////////////
  function determineScale(
    lowerLimit,
    traverseCarouselUp,
    traverseCarouselDown,
    fromBeginningCarouselToEnd,
    fromEndCarouselToBeginning
  ) {
    debugger;
    const evenVisibleCarouselCount = visibleCarouselCount % 2 === 0;

    const transformScale = {
      fromScale: "scale(.95)",
      toScale: "scale(.95)"
    };
    const additionalCarouselItemFocus =
      evenVisibleCarouselCount && visibleCarouselCount > 1;

    if (lowerLimit === activeSlideIndex) transformScale.toScale = "scale(1)";

    if (
      prevActiveSlideIndex + 1 !== activeSlideIndex &&
      prevActiveSlideIndex - 1 !== activeSlideIndex &&
      !fromBeginningCarouselToEnd &&
      !fromEndCarouselToBeginning
    ) {
      if (activeSlideIndex === lowerLimit)
        transformScale.fromScale = "scale(.95)";

      if (activeSlideIndex !== 0 && lowerLimit === activeSlideIndex - 1) {
        transformScale.fromScale = "scale(.95)";
        transformScale.toScale = "scale(1)";
      }

      if (
        activeSlideIndex === 0 &&
        children.length + lowerLimit === children.length - 1
      ) {
        transformScale.fromScale = "scale(.95)";
        transformScale.toScale = "scale(1)";
      }

      return transformScale;
    }

    if (fromBeginningCarouselToEnd) {
      if (additionalCarouselItemFocus) {
        if (lowerLimit === activeSlideIndex)
          transformScale.fromScale = "scale(1)";

        if (lowerLimit === activeSlideIndex - 1)
          transformScale.toScale = "scale(1)";
      }
      // debugger;
      if (prevActiveSlideIndex === lowerLimit - children.length) {
        transformScale.fromScale = "scale(1)";
        transformScale.toScale = "scale(.95)";
      }
      return transformScale;
    }

    if (fromEndCarouselToBeginning) {
      if (additionalCarouselItemFocus) {
        if (children.length + lowerLimit === children.length - 1) {
          transformScale.fromScale = "scale(1)";
          transformScale.toScale = "scale(1)";
        }
      }

      if (prevActiveSlideIndex - 1 === children.length + lowerLimit)
        transformScale.fromScale = "scale(1)";
      // debugger;
      return transformScale;
    }

    if (traverseCarouselUp) {
      if (additionalCarouselItemFocus) {
        if (prevActiveSlideIndex === lowerLimit) {
          transformScale.toScale = "scale(1)";
          transformScale.fromScale = "scale(1)";
        }

        if (prevActiveSlideIndex === 0) {
          if (children.length + lowerLimit === children.length - 1)
            transformScale.fromScale = "scale(1)";
        }

        if (prevActiveSlideIndex - 1 === lowerLimit)
          transformScale.fromScale = "scale(1)";
      }

      return transformScale;
    }

    if (traverseCarouselDown) {
      if (additionalCarouselItemFocus) {
        if (lowerLimit === activeSlideIndex)
          transformScale.fromScale = "scale(1)";
        if (lowerLimit + 1 === activeSlideIndex)
          transformScale.toScale = "scale(1)";
      }

      if (prevActiveSlideIndex === lowerLimit) {
        transformScale.fromScale = "scale(1)";
        transformScale.toScale = "scale(.95)";
      }

      return transformScale;
    }

    if (
      additionalCarouselItemFocus &&
      activeSlideIndex !== 0 &&
      lowerLimit === activeSlideIndex - 1
    )
      transformScale.toScale = "scale(1)";

    if (
      additionalCarouselItemFocus &&
      activeSlideIndex === 0 &&
      children.length + lowerLimit === children.length - 1
    )
      transformScale.toScale = "scale(1)";

    if (lowerLimit === prevActiveSlideIndex)
      transformScale.fromScale = "scale(1)";

    if (
      additionalCarouselItemFocus &&
      lowerLimit === activeSlideIndex &&
      prevActiveSlideIndex === activeSlideIndex - 1
    )
      transformScale.fromScale = "scale(1)";

    // if (
    //   additionalCarouselItemFocus &&
    //   lowerLimit === activeSlideIndex &&
    //   prevActiveSlideIndex + 1 === activeSlideIndex
    // )
    // if (
    //   additionalCarouselItemFocus &&
    //   traverseCarouselUp &&
    //   lowerLimit === activeSlideIndex
    // )
    //   transformScale.fromScale = "scale(1)";

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

  function carouselSlide(index) {
    const carouselItemPosition = getTranslatePosition(index);
    return (
      <Li
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
      <Li {...style} onClick={() => goToSlide(index)}>
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
            {children.map((item, idx) => carouselSlide(idx))}
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
