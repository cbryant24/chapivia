import { flex } from 'styled-system';
import Box from './Box';
import styled from 'styled-components';
import theme from '../elements/theme';

const FlexItem = styled(Box)`
  ${flex}
`;

FlexItem.displayName = "FlexItem";

export default FlexItem;