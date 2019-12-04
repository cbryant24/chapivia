import { flex, system } from 'styled-system';
import Box from './Box';
import styled from 'styled-components';
import cleanElement from 'clean-element';
import { filterProps, addThemeStyle } from './utils';

const UL = styled(Box)``;

UL.target = "ul";

export const ULFLEX = styled(UL)`
  display: flex
`

export default UL;