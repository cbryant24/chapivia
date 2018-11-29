import Box from './Box';
import PropTypes from 'prop-types';

const ModalBackground = Box.extend`
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99;
`

ModalBackground.displayName = 'Grid';

export default ModalBackground;