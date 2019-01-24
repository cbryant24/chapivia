import React, { Component } from 'react';
import { keyBy, map } from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo'

import query from '../queries/Scores';

import * as actions from '../actions';
import { GridItem, Flex, FlexItem, Image, Text } from './elements';
import kgrad from '../img/kgrad.png';

class Scoreboard extends Component {

  componentWillMount() {
    // this.props.getPlayerScores();
  }

  componentDidUpdate(prevProps) {
    // if(this.props.announceAnswer && this.props.announceAnswer !== prevProps.announceAnswer) {
    //   this.props.getPlayerScores();
    // }
  }

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

    if (this.props.data.loading) return <Flex></Flex>;
    
    if (!this.props.data.scores) return <Flex></Flex>;

    this.props.data.scores.map( player => {
      renderedScores.push(
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          key={player.id}
        >
          <FlexItem display="flex" width="100%"> 
            {/* <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/> */}
            <Text.span
              textTransform="uppercase"
              fontSize="1.7rem"
              fontWeight="500"
              padding-left="2rem"
            >
              {player.name}
            </Text.span>
          </FlexItem>
          <FlexItem width="30%">
            <Text.span 
              fontSize="1.7rem"
              fontWeight="500"
            >
              {player.score}
            </Text.span>
          </FlexItem>
        </Flex>
      )
    });
    return renderedScores;
  }

  render() {
    return(
      < GridItem 
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        <Flex
          justifyContent="space-between"
        >
            <Text.p>Player</Text.p>
            <Text.p>Score</Text.p>
        </Flex>
        {this.dispalayPlayerScores()}
      </GridItem>
    );
  }
}

export default graphql(query)(Scoreboard);