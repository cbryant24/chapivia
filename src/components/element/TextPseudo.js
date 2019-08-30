import React from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';

import { addStyles } from './utils';
import systemStyledCSS from '@styled-system/css';
import { ALL, addPseudo } from './utils';
import Text from './Text';
import { getAnimation } from './animations';

export const TextPseudo = styled(Text)`
  ${ props => addStyles(props) } 
  ${ ALL }
  ${props => {
    const { animation, before, after, ...restProps } = props;

    return props.pseudo ? addPseudo(restProps) : null
  }}
  ${props => {
      if (!props.pseudo || !props.before) return;
      const { animation, content, ...restProps } = props.before;
      return (systemStyledCSS({
        '&::before': {
          content: JSON.stringify(content),
          ...restProps
        }
      }));
    }
  }

  ${props => {
      if (!props.pseudo || !props.after) return;
      const { animation, content, ...restProps } = props.after;
      return (systemStyledCSS({
        '&::after': {
          content: JSON.stringify(content),
          ...restProps
        }
      }));
    }
  }

  ${ props => {
    if (!props.pseudo || !props.before || !props.before.animation) return;

    const animationProperties = getAnimation(props.before);
    return (
      css`
        ::before {
          animation-name: ${animationProperties.animation};
          animation-duration: ${animationProperties.duration};
          animation-iteration-count: ${animationProperties.iteration};
          animation-timing-function: ${animationProperties.animationTimingFunction};
          animation-direction: ${animationProperties.animationDirection};
          animation-fill-mode: ${animationProperties.animationFillMode};
          animation-play-state: running;
        }`
    );
  }}

  ${ props => {
    if (!props.pseudo || !props.after || !props.after.animation) return;

    const animationProperties = getAnimation(props.after);
    return (
      css`
        ::after {
          animation-name: ${animationProperties.animation};
          animation-duration: ${animationProperties.duration};
          animation-iteration-count: ${animationProperties.iteration};
          animation-timing-function: ${animationProperties.animationTimingFunction};
          animation-direction: ${animationProperties.animationDirection};
          animation-fill-mode: ${animationProperties.animationFillMode};
          animation-play-state: running;
      }`
    );
  }}
`

export const TextAnimatedPseudo = styled(Text)`
  //${ props => addStyles(props) }
  ${ ALL }
  ${props => {
    const { animation, before, after, children, ...restProps } = props;
    // debugger
    return props.pseudo ? addPseudo(restProps) : null
  }}
  
  ${props => {
      if (!props.animation) return;

      const animationProperties = getAnimation(props);
      return (
        css`
          animation-name: ${animationProperties.animation};
          animation-duration: ${animationProperties.duration};
          animation-iteration-count: ${animationProperties.iteration};
          animation-timing-function: ${animationProperties.animationTimingFunction};
          animation-direction: ${animationProperties.animationDirection};
          animation-fill-mode: ${animationProperties.animationFillMode};
          animation-play-state: running;
        `
      );
    }
  }
  ${props => {
      if (!props.pseudo || !props.before) return;

      const { animation, content, ...restProps } = props.before;
      return (systemStyledCSS({
        '&::before': {
          content: JSON.stringify(content),
          ...restProps
        }
      }));
    }
  }

  ${props => {
      if (!props.pseudo || !props.after) return;
      const { animation, content, ...restProps } = props.after;
      return (systemStyledCSS({
        '&::after': {
          content: JSON.stringify(content),
          ...restProps
        }
      }));
    }
  }

  ${ props => {
    if (!props.pseudo || !props.before || !props.before.animation) return;

    const animationProperties = getAnimation(props.before);
    return (
      css`
        ::before {
          animation-name: ${animationProperties.animation};
          animation-duration: ${animationProperties.duration};
          animation-iteration-count: ${animationProperties.iteration};
          animation-timing-function: ${animationProperties.animationTimingFunction};
          animation-direction: ${animationProperties.animationDirection};
          animation-fill-mode: ${animationProperties.animationFillMode};
          animation-play-state: running;
      }`
    );
  }}

  ${ props => {
    if (!props.pseudo || !props.after || !props.after.animation) return;

    const animationProperties = getAnimation(props.after);
    return (
      css`
        ::after {
        animation-name: ${animationProperties.animation};
        animation-duration: ${animationProperties.duration};
        animation-iteration-count: ${animationProperties.iteration};
        animation-timing-function: ${animationProperties.animationTimingFunction};
        animation-direction: ${animationProperties.animationDirection};
        animation-fill-mode: ${animationProperties.animationFillMode};
        animation-play-state: running;
      }`
    );
  }}
`