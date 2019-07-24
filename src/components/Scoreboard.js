import React, { Component } from 'react';
import { keyBy, map } from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo'

import query from '../queries/Scores';

import * as actions from '../actions';
import { GridItem, Flex, FlexItem, Image, Text } from './element';
import * as Elements from './element';
import kgrad from '../img/kgrad.png';

class Scoreboard extends Component {

  displayHeaders(headers) {
    return (
      headers.map( title =>  {
        return (
          <Flex
            key={title}
            m="2rem"
            textAlign="center"
            textTransform="uppercase"
          >
            {title}
          </Flex>
        )
      })
    )
  }

  dispalayPlayerScores() {
    const renderedScores = [];

    if (this.props.data.loading) return <Elements.Flex></Elements.Flex>;
    
    if (!this.props.data.scores) return <Elements.Flex></Elements.Flex>;

    this.props.data.scores.map( player => {
      renderedScores.push(
        <Elements.Flex
          fontSize="1.6rem"
          textAlign="center"
          justifyContent="space-between"
          height="4rem"
          key={player.id}
        >
          <Text.span
            textTransform="uppercase"
            fontSize="1.7rem"
            fontWeight="500"
            padding-left="2rem"
          >
            {player.name}
          </Text.span>
            <Text.span 
              fontSize="1.7rem"
              fontWeight="500"
            >
              {player.score}
            </Text.span>
        </Elements.Flex>
      )
    });
    return renderedScores;
  }

  render() {
    return(
      < Elements.Flex 
        flexDirection="column"
      >
        <Elements.Flex
          justifyContent="space-between"
        >
            <Elements.Text.p>Player</Elements.Text.p>
            <Elements.Text.p>Score</Elements.Text.p>
        </Elements.Flex>
        {this.dispalayPlayerScores()}
      </ Elements.Flex>
    );
  }
}

export default graphql(query)(Scoreboard);