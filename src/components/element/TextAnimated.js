import styled, { css } from 'styled-components';

import { addStyles } from './utils';
import { getAnimation } from './animations';
import Text from './Text';
import { ALL } from './utils';

const TextAnimated = styled(Text)(
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

export default TextAnimated;