import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import { Flex, FlexItem, Text } from './elements';
import { css, keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom'

import mutation from '../mutations/Logout';
import query from '../queries/CurrentUser';

class Title extends Component {
  onLogoutClick() {
    
    this.props.mutate({
      refetchQueries: [{ query }]
    });
    this.props.history.push('/');
  }

  render() {
    if (this.props.data.loading) return <Flex></Flex>;

    return (
      <Flex
        justifyContent="center"
        position="relative"
        width="100%"
      >
        <FlexItem
          m="0"
          p="0"
          letterSpacing="3rem"
          filter="drop-shadow(0 0 20px hsla(320, 40%, 60%, 0.8))"
          position="relative"
          zIndex="1"
          fontFamily="'Passion One', cursive"
          fontStyle="italic"
          >
            <Text.p 
              caps 
              color="hsl(320, 90%, 90%)"
              clipPath="inset(40% 0% 40% 0%)"
              fontSize="8rem"
              zIndex="5"
            >
              Chapivia
            </Text.p>
            <Text.p 
              caps 
              fontSize="8rem"
              position="absolute"
              top="0"
              left="0"
              zIndex="10"
              color="hsl(260, 90%, 80%)"
              clipPath="inset(0% 0% 60% 0%)"
              animation_one="1000ms steps(1) alternate infinite"
            >
              Chapivia
            </Text.p>
            <Text.p 
              caps 
              fontSize="8rem"
              position="absolute"
              top="0"
              left="0"
              zIndex="10"
              color="hsl(260, 90%, 80%)"
              clipPath="inset(60% 0% 0% 0%)"
              animation_two="1000ms steps(1) alternate infinite"
            >
              Chapivia
            </Text.p>
            <FlexItem
              position="absolute"
              left="0"
              top="20%"
              height="50%"
              width="100%"
              backgroundColor="hsl(225, 100%, 40%)"
              zIndex="-1"
              animation="20s steps(1) infinite"
            >
            </FlexItem>
        </FlexItem>
        <FlexItem
          position="absolute"
          right="0"
          display={ this.props.data.user ? "inline-block" : "none" }
          zIndex="20"
        >
          <Text.p
            cursor="pointer"
            fontSize="20px"
            onClick={ this.onLogoutClick.bind(this) }
          >
            signout
          </Text.p>
        </FlexItem>
      </Flex>
    );
  }
}

export default withRouter(graphql(query)(
  graphql(mutation)(Title)
));
