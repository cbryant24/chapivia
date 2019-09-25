import { flex } from 'styled-system';
import Box from './Box';
import styled from 'styled-components';

const FlexItem = styled(Box)`
  ${flex}
`;

FlexItem.displayName = "FlexItem";

export default FlexItem;