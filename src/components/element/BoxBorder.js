import styled from 'styled-components';
import Box from './Box';
import { BORDER, SHADOW } from './utils';

const BoxBorder = styled(Box)`
  ${BORDER} ${SHADOW}
`

BoxBorder.defaultProps = {
  border: '1px solid #ffffff'
}

export default BoxBorder;