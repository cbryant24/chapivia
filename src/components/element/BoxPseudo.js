import React from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';

import { addStyles } from './utils';
import styledCSS from '@styled-system/css';
import cleanElement from 'clean-element';
import { ALL, filterProps, addPseudo } from './utils';
import { getAnimation } from './animations';

const Base = props => {

  const Div = styled.div``;
  const next = filterProps(props);

  return <Div {...next} />;
}

export const BoxPseudo = styled(cleanElement(Base))`
  ${ props => addStyles(props) } 
  ${ ALL }
  ${props => {
    const { animation, before, after, ...rest } = props;

    return props.pseudo ? addPseudo(rest) : null
  }}
  ${props => {
      if (!props.pseudo || !props.before) return;
      const { animation, content, ...rest } = props.before;
      return (styledCSS({
        '&::before': {
          content: JSON.stringify(content),
          ...rest
        }
      }));
    }
  }

  ${props => {
      if (!props.pseudo || !props.after) return;
      const { animation, content, ...rest } = props.after;
      return (styledCSS({
        '&::after': {
          content: JSON.stringify(content),
          ...rest
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

export const BoxAnimatedPseudo = styled(cleanElement(Base))`
  ${ props => addStyles(props) }
  ${ ALL }
  ${props => {
    const { animation, before, after, ...rest } = props;

    return props.pseudo ? addPseudo(rest) : null
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

      const { animation, content, ...rest } = props.before;
      return (styledCSS({
        '&::before': {
          content: JSON.stringify(content),
          ...rest
        }
      }));
    }
  }

  ${props => {
      if (!props.pseudo || !props.after) return;
      const { animation, content, ...rest } = props.after;
      return (styledCSS({
        '&::after': {
          content: JSON.stringify(content),
          ...rest
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