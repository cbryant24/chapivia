import { 
  form,
  maxWidth,
  justifyContent
} from 'styled-system';
import styled from 'styled-components';
import Flex from './Box';

const FlexForm = Flex.withComponent('form').extend`
  display: flex;
  ${maxWidth}
  ${justifyContent} 
`

export default FlexForm;