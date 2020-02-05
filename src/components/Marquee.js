import React, { useEffect } from 'react';

import { BoxAll, keyframes } from '@cbryant24/styled-react';
import { determineBreakPoint } from '../components/helpers';
import { useWindowSize } from '../hooks';

//TODO: ADD Logic to use width values other than percentage
//TODO: ADD Logic to use parts of the size value i.e. width={[4,5]} currently doesn't work
//TODO: ADD Logic to determine contionus duration
function Marquee({ theme, children, ...props }) {
  const { width: windowWidth } = useWindowSize();
  // debugger
  function createMarqueeItems() {

    return children.map( (child, index) => {
      const width = Array.isArray(child.props.width) && child.props.width.length > 1 ? 
                                                        theme.sizes[determineBreakPoint(theme)] : 
                                                        Array.isArray(child.props.width) ?
                                                        theme.sizes[child.props.width] : child.props.width
                                                      // theme.sizes[determineBreakPoint(theme)] : child.props.width;
      const widthInt = parseInt(width.match(/^[\d]+/))
      const marqueeAnimation = keyframes`
        from { right: -${(widthInt + 100)}% }
        to { right: ${(widthInt + 100)}% }
      `;

      // debugger
      const marqueeItemStyle = {
        position: "absolute",
        width: [1],
        right: `-${(widthInt + 100)}%`,
        animation: {
          continuous: marqueeAnimation,
          duration_continuous: windowWidth > 1000 ? 26 : windowWidth > 700 ? 22 : windowWidth > 500 ? 19 : 16,
          delay_in: index * 4,
          animation_fill_mode: 'forwards',
        }
      }

      return (<BoxAll isA="li" {...marqueeItemStyle}>{child}</BoxAll>);
    })
  }
  // debugger
  
  return(
    <BoxAll
      id="marquee-scroller"
      isA="ul"
      position="relative"
      overflow="hidden"
      {...props}
    >
      {createMarqueeItems()}
    </BoxAll>
  );
}

export default Marquee;