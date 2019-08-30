import styled, { css } from 'styled-components';

import { addStyles } from './utils';
import { getAnimation } from './animations';
import Box from './Box';
import { ALL } from './utils';

const BoxAnimated = styled(Box)(
  ALL,
  props => addStyles(props),
  props => {
    if (!props.animation) return;

    const animationProperties = getAnimation(props);
    // debugger
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
  },
  
);

export default BoxAnimated;