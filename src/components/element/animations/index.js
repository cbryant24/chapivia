import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FadeAnimations,
  BounceAnimations,
  ScaleAnimations,
  RotateAnimations,
  SlideAnimations
} from './animations';
import Box from '../Box';
import { cssList } from '../utils';
import { transitionTypes } from './type-transitions';

const Wrapper = styled(Box)`
  animation-duration: ${({ duration }) => (duration ? `${duration}s` : '1s')};
  animation-name: ${({ animation }) =>
    animation ? animation : 'no-animation'};
  animation-fill-mode: forwards;
  animation-iteration-count: ${({ iteration }) =>
    iteration ? iteration : '1'};
  > * {
    ${({ transitionFrom }) =>
      transitionFrom && transitionFrom !== '' ? transitionFrom : ''};
    transition: all 0.3s ease-in-out;
    &:hover {
      ${({ transitionTo }) =>
        transitionTo && transitionTo !== '' ? transitionTo : ''};
    }
  }
  &:focus {
    ${({ transitionTo }) =>
      transitionTo && transitionTo !== '' ? transitionTo : ''};
  }
  &:active {
  }
`;

const Animated = props => {
  const [ delay_waited, setDelayWaited ]              = useState(false);
  const [ in_time_waited, setInTimeWaited ]             = useState(false);
  const [ between_time_waited, setBetweenTimeWaited ]   = useState(false);
  const [ transite_in, setTransiteIn ]                = useState(false);
  const [ transite_out, setTransiteOut ]              = useState(false);
  const [ transite_continuous, setTransiteContinous ] = useState(false);
  const [ delay_out_waited, setDelayOutWaited ]         = useState(false);
  const { animation, transition, children }           = props;
  
  
  useEffect(() => {
    // Validate Animation
    // debugger
    validateAnimation(animation);

    // Validate Transitions
    validateTransitions(transition);

    //Set delay_waited regardless of specified or not
    setDelayAsWaited(calculateDelayInTime(animation));

    return () => clearTimeout(setDelayAsWaited);
  }, []);

  useEffect( () => {
    if (!delay_waited) return;
    // debugger
    triggerInAnimation();

    // Do we have a continouos animation
    if (haveAnimationContinuous(animation)) {
      // Wait untill the duration of the IN animation is done
      setInTimeAsWaited(calculateDurationInTime(animation));

      return () => clearTimeout(setInTimeAsWaited);
 
    } else {
      // Do we have an animation out?
      if (haveAnimationOut(animation)) {
        // Wait untill the duration between animations is done
        setBetweenTimeAsWaited(calculateDurationDelayBetween(animation));

        return () => clearTimeout(setBetweenTimeAsWaited);
      }
    }
    
  }, [delay_waited]);

  useEffect( () => {
    if (!in_time_waited) return;
    // debugger
    // Then trigger the CONTINUOUS animation
    triggerContinuousAnimation();
    
    // Do we have an animation out?
    if (haveAnimationOut(animation)) {
      // Wait untill the duration between animations is done
      if (haveAnimationIn(animation)) {
        setBetweenTimeAsWaited(calculateDurationDelayBetween(animation));

        return () => clearTimeout(setBetweenTimeAsWaited);
      } else {
        setDelayOutAsWaited()
      }
    }
  }, [in_time_waited]);

  useEffect( () => {
    if (!between_time_waited && !delay_out_waited) return;

    // Then trigger the OUT animation
    triggerOutAnimation();
  }, [between_time_waited, delay_out_waited]);
  

  const waitUntill = amount =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      return resolve();
    }, amount);
  });

  const triggerInAnimation = () => {
    return setTransiteIn(true);
  };

  const triggerOutAnimation = () => {
    setTransiteOut(true);
    setTransiteContinous(false);
  };

  const triggerContinuousAnimation = () => {
    return setTransiteContinous(true);
  };

  const triggerDirectContinuousAnimation = () => {
    setTransiteIn(true);
    setTransiteContinous(true);
    return;
  };

  const setDelayAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      console.log(delay_waited)
      // debugger
      setDelayWaited(true);
      return
    }, waitTime)
  };

  //MY FUNCTION FOR COUNTING IN TIME
  const setInTimeAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setInTimeWaited(true)
    }, waitTime);
  };

  //MY FUNCTION FOR COUNTING BETWEEN TIME
  const setBetweenTimeAsWaited = (waitTime = 0) => {
    // debugger
    setTimeout( function() {
      // debugger
      setBetweenTimeWaited(true);
    }, waitTime);
  };

  const setDelayOutAsWaited = (waitTime = 0) => {
    // debugger
    setTimeout( function() {
      setDelayOutWaited(true);
    }, waitTime)
  }

  const haveDelayIn = animation => {
    if (!animation) return;
    return 'delay_in' in animation;
  };
  
  const haveAnimationIn = animation => {
    if (!animation) return;
    return 'in' in animation;
  };

  const haveAnimationOut = animation => {
    if (!animation) return;
    return 'out' in animation;
  };

  const haveAnimationContinuous = animation => {
    if (!animation) return;
    return 'continuous' in animation;
  };

  const calculateDelayInTime = animation => {
    // debugger
    if (!animation) return;
    return animation.delay_in * 1000 || 0;
  };

  const calculateDelayOutTime = animation => {
    if (!animation) return;
    return animation.delay_out * 1000 || 0;
  };

  const calculateDurationInTime = animation => {
    if (!animation) return;
    return animation.duration_in * 1000 || 0;
  };

  const calculateDurationDelayBetween = animation => {
    if (!animation) return;
    return animation.delay_between * 1000 || 0;
  };

  const checkForValidCSSProperty = property => {
    return cssList.includes(property);
  };

  const checkForValidDuration = duration => {
    return typeof duration === 'number' && duration >= 0;
  };

  const checkForValidTransitionType = transitionType => {
    return transitionTypes.includes(transitionType);
  };

  const checkForValidIteration = iteration => {
    const rounds = parseInt(iteration, 10);
    return (
      (typeof rounds === 'number' && rounds >= 1) || iteration === 'infinite'
    );
  };

  const checkForValidFromToObject = fromToObject => {
    return 'property' in fromToObject && 'value' in fromToObject;
  };

  const validateAnimation = animation => {
    if (!animation) return;
    // Check of an in animation
    if ('in' in animation) {
      // Check if that animation has also a duration
      if (!('duration_in' in animation)) {
        throw new TypeError(
          'If you have an in animation you need to specify a duration for that animation'
        );
      } else {
        // Check for Valid Animation Duration In
        if (!checkForValidDuration(animation.duration_in)) {
          throw new TypeError(
            `${
              animation.duration_in
            } is not a valid duration in for an animation`
          );
        }
      }
      // Check if this in animation is going to iterate
      if ('iteration' in animation) {
        // Check for Valid Iteration
        if (!checkForValidIteration(animation.iteration)) {
          throw new TypeError(
            `${
              animation.iteration
            } is not a valid type of iteration property. Should be real number or the 'inifite' literal`
          );
        }
      }
    } else {
      if ('delay_between' in animation) {
        throw new TypeError(
          `You cannot have a delay between in and out animations if you're missing any of them`
        );
      }
    }
    // Check of an out animation
    if ('out' in animation) {
      // Check if that animation has also a duration
      if (!('duration_out' in animation)) {
        throw new TypeError(
          'If you have an out animation you need to specify a duration for that animation'
        );
      }
    } else {
      if ('delay_between' in animation) {
        throw new TypeError(
          `You cannot have a delay between in and out animations if you're missing any of them`
        );
      }
    }
    // Check for both animations (in and out) at the same time
    if ('in' in animation && 'out' in animation) {
      // Check if there's also a delay between those animations
      if (!('delay_between' in animation)) {
        throw new TypeError(
          'If you have an in animation and an out animation you need to specify a delay between those animations'
        );
      }
      // Check for Valid Animation Duration In
      if (!checkForValidDuration(animation.duration_out)) {
        throw new TypeError(
          `${
            animation.duration_out
          } is not a valid duration out for an animation`
        );
      }
    }
    // Check for a continuous animation
    if ('continuous' in animation) {
      if ('duration_continuous' in animation) {
        // Check for Valid Animation Duration In
        if (!checkForValidDuration(animation.duration_continuous)) {
          throw new TypeError(
            `${
              animation.duration_continuous
            } is not a valid duration for a continuous animation`
          );
        }
      } else {
        throw new TypeError(
          `${
            animation.duration_out
          } is not a valid duration out for an animation`
        );
      }
    }
  };

  const validateTransitions = transition => {
    if (!transition) return;
    // debugger
    if (!('type' in transition)) {
      throw new TypeError(
        `You're missing the type of transition property. Eg: hover, focus, blur, active, ...`
      );
    }
    // Check for Valid Transition Type
    if (!checkForValidTransitionType(transition.type)) {
      throw new TypeError(
        `${transition.type} is not a valid type of transition`
      );
    }
    // Check for from transition object
    if (!('from' in transition)) {
      throw new TypeError(
        `You're missing the from property of the transition that sets the point to start at`
      );
    }
    // Check if from object is valid and meet the requirements
    if (!checkForValidFromToObject(transition.from)) {
      throw new TypeError(
        `${JSON.stringify(
          transition.from
        )} is not a valid transition FROM object. It needs to have the following structure: { property: string, value: string || Number }`
      );
    }
    // Check if the from css property is valid
    if (!checkForValidCSSProperty(transition.from.property)) {
      throw new TypeError(
        `${transition.from.property} is not a valid CSS property at FROM object`
      );
    }
    // Check for to transition object
    if (!('to' in transition)) {
      throw new TypeError(
        `You're missing the to property of the transition that sets the point of where to end at`
      );
    }
    // Check if to object is valid and meet the requirements
    if (!checkForValidFromToObject(transition.to)) {
      throw new TypeError(
        `${JSON.stringify(
          transition.from
        )} is not a valid transition TO object. It needs to have the following structure: { property: string, value: string || Number }`
      );
    }
    // Check if the to css property is valid
    if (!checkForValidCSSProperty(transition.to.property)) {
      throw new TypeError(
        `${transition.from.property} is not a valid CSS property at TO object`
      );
    }
  };

    // delay_in: 1,
    // in: FadeAnimations.FadeInBottom,
    // duration_in: 1,
    // continuous: RotateAnimations.RotateCenter,
    // duration_continuous: 1,
    // out: FadeAnimations.FadeOutTop,
    // duration_out: 10,
    // delay_between: 5

  const getCurrentAnimation = () => {
    // debugger
    if (!animation) return;
    const val = transite_in && !transite_continuous && !transite_out
      ? animation.in
      : transite_in && transite_continuous
        ? animation.continuous
        : ((transite_in && !transite_continuous) ||
            (!transite_in && !transite_continuous)) &&
          transite_out
          ? animation.out
          : null;
          
          // debugger

          return val
  };

  const getCurrentDuration = () => {
    if (!animation) return;
    
    const val = transite_in && !transite_continuous && !transite_out
      ? animation.duration_in
      : transite_continuous && !transite_out
        ? animation.duration_continuous
        : transite_out
          ? animation.duration_out
          : null;
// debugger
          return val
  };

  // const getDuration

  const getCurrentIteration = () => {

    if (!animation) return;

    const val = transite_continuous ? 'infinite' : animation.iteration;
// debugger
    return val
  };

  const getTransitionFrom = () => {
    
    if (!transition) return;
    const val = transition.type === 'hover'
      ? `${transition.from.property}: ${transition.from.value}`
      : '';
      // debugger
      return val
  };

  const getTransitionTo = () => {

    if (!transition) return;
    const val = transition.type === 'hover'
      ? `${transition.to.property}: ${transition.to.value};`
      : '';
      // debugger
      return val
  };
  // debugger
  return ( delay_waited && transite_in ? 
      <Wrapper
        animation={getCurrentAnimation()}
        duration={getCurrentDuration()}
        iteration={getCurrentIteration()}
        transitionFrom={getTransitionFrom()}
        transitionTo={getTransitionTo()}
      >
        {children}
      </Wrapper>
      : <Wrapper></Wrapper>
  )
}

export {
  Animated,
  FadeAnimations,
  BounceAnimations,
  ScaleAnimations,
  RotateAnimations,
  SlideAnimations
};

//END HOOK FUNCTION
