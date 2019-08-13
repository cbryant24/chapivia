import styled from "styled-components";
import React from 'react';
// import { propTypes } from 'styled-system';
import { noiseAnimation, bgGlowAnimation } from '../elements/animations';
import { keyframes, css } from 'styled-components'
import Text from './Text';

const TextAnimated = styled(Text)`
  ${props => props.animation()}
`

export default TextAnimated;