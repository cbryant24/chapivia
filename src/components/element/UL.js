import { flex, system } from 'styled-system';
import Box from './Box';
import styled from 'styled-components';

const UL = styled(Box).attrs({isA: "ul"})``;

export const ULFLEX = styled(UL)`
  display: flex
`

export default UL;