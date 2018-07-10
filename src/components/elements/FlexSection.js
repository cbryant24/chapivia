import Flex from './Flex';
import theme from './theme';


const FlexSection = Flex.withComponent('section')

FlexSection.displayName = 'FlexSection';

FlexSection.defaultProps = {
  theme
};

export default FlexSection;