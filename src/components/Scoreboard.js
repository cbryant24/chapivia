import React, { Component } from 'react';
import { keyBy, map } from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { GridItem, Table, Image, Text } from './elements';
import kgrad from '../img/kgrad.png';

class Scoreboard extends Component {

  componentWillMount() {
    this.props.getPlayerScores();
  }

  componentDidUpdate(prevProps) {
    if(this.props.announceAnswer && this.props.announceAnswer !== prevProps.announceAnswer) {
      this.props.getPlayerScores();
    }
  }

  displayTableHeaders(headers) {
    return (
      headers.map( title =>  {
        return (
          <Table.th
            key={title}
            m="2rem"
            textAlign="center"
            textTransform="uppercase"
          >
            {title}
          </Table.th>
        )
      })
    )
  }

  dispalayPlayerScores(playerScores) {
    const renderedScores = [];
    for(let player in playerScores) {
      renderedScores.push(
        <Table.tr
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          key={player}
        >
          <Table.td display="flex" width="100%"> 
            {/* <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/> */}
            <Text.span
              textTransform="uppercase"
              fontSize="1.7rem"
              fontWeight="500"
              padding-left="2rem"
            >
              {player}
            </Text.span>
          </Table.td>
          <Table.td width="30%">
            <Text.span 
              fontSize="1.7rem"
              fontWeight="500"
            >
              {playerScores[player]}
            </Text.span>
          </Table.td>
        </Table.tr>
      )
    }
    return renderedScores;
  }

  render() {
    return(
      < GridItem 
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid blue"
      >
        <Table
          width="100%"
        >
          <Table.body>
            <Table.tr border="1px solid black">
              {this.displayTableHeaders(['Name', 'Score'])}
            </Table.tr>
            {this.dispalayPlayerScores(this.props.playerScores)}
          </Table.body>
        </Table>
      </GridItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    announceAnswer: state.game.announceAnswer,
    playerScores: state.players.playerScores
  }
}

export default connect(mapStateToProps, actions)(Scoreboard);