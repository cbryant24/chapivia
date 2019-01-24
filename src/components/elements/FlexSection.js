import Flex from './Flex';
import theme from './theme';
import Box from './Box';

const FlexSection = Flex.withComponent('section').withComponent(Box)

FlexSection.displayName = 'FlexSection';

FlexSection.defaultProps = {
  theme
};

export default FlexSection;