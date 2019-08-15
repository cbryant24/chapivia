import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FadeAnimations,
  BounceAnimations,
  ScaleAnimations,
  RotateAnimations,
  SlideAnimations
} from './animations';
import { ExtendedBox } from '../ExtendedComponents';
import { addProps } from '../utils';
import { validateAnimation, validateTransitions } from '../utils'

import { getAnimation } from './getAnimation';

const Wrapper = styled(ExtendedBox)`
  animation-duration: ${({ duration }) => (duration ? `${duration}s` : '1s')};
  animation-name: ${({ animation }) => animation ? animation : 'no-animation'};
  animation-fill-mode: ${({ animationFillMode }) => 
    animationFillMode ? animationFillMode : 'forwards'};
  animation-iteration-count: ${({ iteration }) => iteration ? iteration : '1'};
  animation-timing-function: ${({animationTimingFunction}) => 
    animationTimingFunction ? animationTimingFunction : 'ease'}
  animtation-direction: ${({animationDirection}) => 
    animationDirection ? animationDirection : 'normal'}
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
  const [ in_time_waited, setInTimeWaited ]           = useState(false);
  const [ between_time_waited, setBetweenTimeWaited ] = useState(false);
  const [ transite_in, setTransiteIn ]                = useState(false);
  const [ transite_out, setTransiteOut ]              = useState(false);
  const [ transite_continuous, setTransiteContinous ] = useState(false);
  const [ delay_out_waited, setDelayOutWaited ]       = useState(false);
  const { animation, transition, children }           = props;
  
  useEffect(() => {
    // Validate Animation
    validateAnimation(animation);

    // Validate Transitions
    validateTransitions(transition);

    //Set delay_waited regardless of specified or not
    setDelayAsWaited(calculateDelayInTime(animation));

    return () => clearTimeout(setDelayAsWaited);
  }, []);

  useEffect( () => {
    if (!delay_waited) return;
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

  const setDelayAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setDelayWaited(true);
      return
    }, waitTime)
  };

  //FUNCTION FOR COUNTING IN TIME
  const setInTimeAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setInTimeWaited(true)
    }, waitTime);
  };

  //FUNCTION FOR COUNTING BETWEEN TIME
  const setBetweenTimeAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setBetweenTimeWaited(true);
    }, waitTime);
  };

    //FUNCTION FOR COUNTING DELAY OUT
  const setDelayOutAsWaited = (waitTime = 0) => {
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

  const getCurrentAnimation = () => {
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

          return val
  };

  const getCurrentIteration = () => {

    if (!animation) return;

    const val = transite_continuous ? 'infinite' : animation.iteration;

    return val
  };

  const getTransitionFrom = () => {
    
    if (!transition) return;
    const val = transition.type === 'hover'
      ? `${transition.from.property}: ${transition.from.value}`
      : '';

      return val
  };

  const getTransitionTo = () => {

    if (!transition) return;
    const val = transition.type === 'hover'
      ? `${transition.to.property}: ${transition.to.value};`
      : '';

      return val
  };

  //TODO: may need to add validation check that correct animation-fill-mode is provided
  const getAnimationFillMode = () => {
    if (!animation) return;

    return animation.animation_fill_mode;
  }

  //TODO: may need to add validation check that correct animation-timing-function is provided
  const getAnimationTimingFunction = () => {
    if (!animation) return;

    return animation.animation_timing_function;
  }

  //TODO: may need to add validation check that correct animation-direction is provided
  const getAnimationDirection = () => {
    if (!animation) return;

    return animation.animation_direction;
  }

  const createAnimatedComponent = () => {
    const { animation, transition, ...rest} = props;
    const AnimatedWrapper = <Wrapper
                              id="animated_thing"
                              animation={getCurrentAnimation()}
                              animationFillMode={getAnimationFillMode()}
                              animationTimingFunction={getAnimationTimingFunction()}
                              animationDirection={getAnimationDirection()}
                              duration={getCurrentDuration()}
                              iteration={getCurrentIteration()}
                              transitionFrom={getTransitionFrom()}
                              transitionTo={getTransitionTo()}
                            >
                              {children}
                            </Wrapper>

    const AnimatedPropsWrapper = addProps(AnimatedWrapper, rest)
    // debugger
    return AnimatedPropsWrapper;
  }

  return ( delay_waited && transite_in ? createAnimatedComponent() : <Wrapper></Wrapper>

  )
}

export {
  Animated,
  FadeAnimations,
  BounceAnimations,
  ScaleAnimations,
  RotateAnimations,
  SlideAnimations,
  getAnimation
};
