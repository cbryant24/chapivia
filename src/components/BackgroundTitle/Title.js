import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Flex, FlexItem, Text, ExtendedText, TextAnimated, BoxAnimated, ExtendedBox, FadeAnimations } from '../element';
import { textGlitch, randomSquareGlitch } from '../elements/animations';
import { css, keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom'
import mutation from '../../mutations/Logout';
import query from '../../queries/CurrentUser';
import { usePrev } from '../../hooks';

import { GET_USER } from '../../localState/Queries';
import { useAuth } from '../../hooks';


function Title(props) {
  const { loading: userLoading, error, data: userData, refetch, client } = useQuery(query);
  const prevUser = usePrev(userData);
  const [ logout, { data: mutationData }] = useMutation(mutation);
  const { signout } = useAuth();

  // debugger
  const titleTextStyle = {
    textTransform: "uppercase",
    fontSize: ["6rem", "8rem"],
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "10",
    color: "hsl(260, 90%, 80%)",
    fontFamily: "'Passion One', cursive",
    letterSpacing: ".25em",
    animation: {
      continuous: () => textGlitch(10, 10),
      duration_continuous: 1,
      animation_timing_function: 'steps(1)',
      iteration: 'infinite',
      animation_direction: 'alternate'
    }
  }
  
  async function onLogoutClick() {
    signout();

    props.history.push('/');
  }

  useEffect( () => {
    console.log(userData);
    // debugger
    // if (userLoading || userData.user) {
    //   client.writeData({
    //     data: {
    //       player: {
    //         id: '',
    //         name: '',
    //         email: '',
    //         role: '',
    //         __typename: 'player'
    //       }
    //     }
    //   });
    // };


    // debugger
  }, [userData])

  //debugger
  if (userLoading) return <Flex></Flex>;
  // return <Flex></Flex>;

  // debugger
  return (
    <Flex
      id="title"
      justifyContent="center"
      position="relative"
      width="100%"
      height={['15vh', '20vh']}
    >
      <FlexItem
        m={[0]}
        p={[0]}
        filter="drop-shadow(0 0 20px hsla(320, 40%, 60%, 0.8))"
        position="relative"
        zIndex="1"
        fontFamily="'Passion One', cursive"
        fontStyle="italic"
        >
          <ExtendedText
            color="hsl(320, 90%, 90%)"
            clipPath="inset(40% 0% 40% 0%)"
            textTransform={titleTextStyle.textTransform}
            fontSize={titleTextStyle.fontSize}
            fontFamily={titleTextStyle.fontFamily}
            letterSpacing={titleTextStyle.letterSpacing}
            zIndex="5"
          >
            Chapivia
          </ExtendedText>
          <TextAnimated 
            {...titleTextStyle}
            clipPath="inset(0% 0% 60% 0%)"
          >
            Chapivia
          </TextAnimated>
          <TextAnimated
            {...titleTextStyle}
            clipPath="inset(60% 0% 0% 0%)"
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
      { userData.user ? 
        <FlexItem
          position="absolute"
          right="0"
          display={ userData.user ? "inline-block" : "none" }
          zIndex="20"
        >
          <Text
            cursor="pointer"
            fontSize="16px"
            onClick={ onLogoutClick }
          >
            signout { userData.user.name }
          </Text>
        </FlexItem> : ''
      }
    </Flex>
  );
}

export default withRouter(Title);

// export default withRouter(graphql(query)(
//   graphql(mutation)(Title)
// ));
