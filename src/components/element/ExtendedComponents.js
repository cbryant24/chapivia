import { system } from 'styled-system';
import styled from 'styled-components';
import Box from './Box';
import Flex from './Flex';
import Text from './Text';
import Input from './Input';
import Grid from './Grid';
import { cssProperties, offset, objectFit } from './css-helpers';

const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

export const ExtendedBox = styled(Box)`
  ${props => addStyles(props)}
`;

export const ExtendedFlex = styled(Flex)`
  ${props => addStyles(props)}
`;

export const ExtendedFlexItem = styled(Flex)`
  ${props => addStyles(props)}
`;

export const ExtendedGrid = styled(Grid)`
  ${props => addStyles(props)}
`

export const ExtendedGridItem = styled(Grid)`
  ${props => addStyles(props)}
`

export const ExtendedText = styled(Text)`
  ${props => addStyles(props)}
`;

export const ExtendedInput = styled(Input)`
  ${props => addStyles(props)}
`;