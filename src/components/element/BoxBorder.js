import sylted from 'sytled-components';
import Box from './Box';
import { BORDER, SHADOW } from './utils';

const BoxBorder = styled(Box)`
  ${BORDER} ${SHADOW}
`

BorderBox.defaultProps = {
  border: '1px solid #ffffff'
}

export default BoxBorder;