import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import { Flex, FlexItem, Text, ExtendedText, TextAnimated, BoxAnimated, ExtendedBox } from './element';
import { textGlitch, randomSquareGlitch } from './elements/animations';
import { css, keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom'

import mutation from '../mutations/Logout';
import query from '../queries/CurrentUser';

function Title(props) {
  function onLogoutClick() {
    debugger
    props.mutate({
      refetchQueries: [{ query }]
    });
    props.history.push('/');
  }

  if (props.data.loading) return <Flex></Flex>;

  return (
    <Flex
      id="title"
      justifyContent="center"
      position="relative"
      width="100%"
    >
      <ExtendedBox
        id="background-lines"
        position="absolute"
        top="0"
        left="0"
        backgroundImage="repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 1px, #000 1px, #000 2px
        )"
        backgroundSize="100% 2px, cover"
        transformOrigin="50% 50%"
        transform="rotate(0)"
        content=""
        opacity="0.6"

        height="100%"
        width="100%"
        zIndex="5"
      />
      <FlexItem
        m={[0]}
        p={[0]}
        letterSpacing="3rem"
        filter="drop-shadow(0 0 20px hsla(320, 40%, 60%, 0.8))"
        position="relative"
        zIndex="1"
        fontFamily="'Passion One', cursive"
        fontStyle="italic"
        >
          <ExtendedText
            textTransform="uppercase"
            color="hsl(320, 90%, 90%)"
            clipPath="inset(40% 0% 40% 0%)"
            fontSize="8rem"
            fontFamily="'Passion One', cursive"
            zIndex="5"
          >
            Chapivia
          </ExtendedText>
          <TextAnimated 
            textTransform="uppercase"
            fontSize="8rem"
            position="absolute"
            top="0"
            left="0"
            zIndex="10"
            color="hsl(260, 90%, 80%)"
            clipPath="inset(0% 0% 60% 0%)"
            fontFamily="'Passion One', cursive"
            animation={{
              continuous: () => textGlitch(15, 16),
              duration_continuous: 1,
              animation_timing_function: 'steps(1)',
              iteration: 'infinite',
              animation_direction: 'alternate'
            }}
          >
            Chapivia
          </TextAnimated>
          <TextAnimated 
            textTransform="uppercase"
            fontSize="8rem"
            position="absolute"
            top="0"
            left="0"
            zIndex="10"
            color="hsl(260, 90%, 80%)"
            clipPath="inset(60% 0% 0% 0%)"
            fontFamily="'Passion One', cursive"
            animation={{
              continuous: () => textGlitch(10, 10),
              duration_continuous: 1,
              animation_timing_function: 'steps(1)',
              iteration: 'infinite',
              animation_direction: 'alternate'
            }}
          >
            Chapivia
          </TextAnimated>
          <BoxAnimated
            position="absolute"
            left="0"
            top="20%"
            height="50%"
            width="100%"
            backgroundColor="hsl(225, 100%, 40%)"
            zIndex="-1"
            animation={randomSquareGlitch}
            animation={{
              continuous: randomSquareGlitch(),
              duration_continuous: 20,
              animation_timing_function: 'steps(1)',
              iteration: 'infinite'
            }}
          />
      </FlexItem>
      { !props.data.user ? 
        <FlexItem
          position="absolute"
          right="0"
          display={ !props.data.user ? "inline-block" : "none" }
          zIndex="20"
        >
          <Text
            cursor="pointer"
            fontSize="16px"
            onClick={ onLogoutClick.bind(this) }
          >
            signout chris
          </Text>
        </FlexItem> : ''
      }
    </Flex>
  );
}
// class Title extends Component {
//   onLogoutClick() {
    
//     this.props.mutate({
//       refetchQueries: [{ query }]
//     });
//     this.props.history.push('/');
//   }

//   render() {
//     if (this.props.data.loading) return <Flex></Flex>;
//     return (
//       <Flex
//         justifyContent="center"
//         position="relative"
//         width="100%"
//       >
//         <FlexItem
//           m="0"
//           p="0"
//           letterSpacing="3rem"
//           filter="drop-shadow(0 0 20px hsla(320, 40%, 60%, 0.8))"
//           position="relative"
//           zIndex="1"
//           fontFamily="'Passion One', cursive"
//           fontStyle="italic"
//           >
//             <Text.p 
//               caps 
//               color="hsl(320, 90%, 90%)"
//               clipPath="inset(40% 0% 40% 0%)"
//               fontSize="8rem"
//               zIndex="5"
//             >
//               Chapivia
//             </Text.p>
//             <Text.p 
//               caps 
//               fontSize="8rem"
//               position="absolute"
//               top="0"
//               left="0"
//               zIndex="10"
//               color="hsl(260, 90%, 80%)"
//               clipPath="inset(0% 0% 60% 0%)"
//               animation_one="1000ms steps(1) alternate infinite"
//             >
//               Chapivia
//             </Text.p>
//             <Text.p 
//               caps 
//               fontSize="8rem"
//               position="absolute"
//               top="0"
//               left="0"
//               zIndex="10"
//               color="hsl(260, 90%, 80%)"
//               clipPath="inset(60% 0% 0% 0%)"
//               animation_two="1000ms steps(1) alternate infinite"
//             >
//               Chapivia
//             </Text.p>
//             <FlexItem
//               position="absolute"
//               left="0"
//               top="20%"
//               height="50%"
//               width="100%"
//               backgroundColor="hsl(225, 100%, 40%)"
//               zIndex="-1"
//               animation="20s steps(1) infinite"
//             >
//             </FlexItem>
//         </FlexItem>
//         { this.props.data.user ? 
//           <FlexItem
//             position="absolute"
//             right="0"
//             display={ this.props.data.user ? "inline-block" : "none" }
//             zIndex="20"
//           >
//             <Text.p
//               cursor="pointer"
//               fontSize="16px"
//               onClick={ this.onLogoutClick.bind(this) }
//             >
//               signout { this.props.data.user.name }
//             </Text.p>
//           </FlexItem> : ''
//         }
//       </Flex>
//     );
//   }
// }

export default withRouter(graphql(query)(
  graphql(mutation)(Title)
));
