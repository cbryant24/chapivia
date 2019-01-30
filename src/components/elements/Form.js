import { 
  form, 
  justifyContent
} from 'styled-system';
import styled from 'styled-components';
import Flex from './Box';

const FlexForm = Flex.withComponent('form').extend`
  ${justifyContent} 
`

export default FlexForm;