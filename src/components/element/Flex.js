import { flex, system } from 'styled-system';
import Box from './Box';
import styled from 'styled-components';

const Flex = styled(Box)`
  display: flex;
  ${flex}
  ${system({
    'flex-flow': true
  })}
`;

export default Flex;