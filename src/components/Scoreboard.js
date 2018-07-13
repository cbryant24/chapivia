import React, { Component } from 'react';
import { keyBy, map } from 'lodash';
import { GridItem, Table, Image, Text } from './elements';
import kgrad from '../img/kgrad.png';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    let vals = [{id: "0", name: "ross", score: 20}, {id: "1", name: "roe", score: 27}, {id: "2", name: "chris", score: 90}];
    
    let playerScores = keyBy(vals, "id");

    this.state = {
      playerScores
    };
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

  dispalayGuesses(playerScores) {
    return (
      map(playerScores, player => (
        <Table.tr
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          key={player.id}
        >
          <Table.td display="flex" width="100%"> 
            <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/>
            <Text.span
              textTransform="uppercase"
              fontSize="1.7rem"
              fontWeight="500"
              padding-left="2rem"
            >
              {player.name}
            </Text.span>
          </Table.td>
          <Table.td width="30%">
            <Text.span 
              fontSize="1.7rem"
              fontWeight="500"
            >
              {player.score}
            </Text.span>
          </Table.td>
        </Table.tr>
      ))
    )
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
            {this.dispalayGuesses(this.state.playerScores)}
          </Table.body>
        </Table>
      </GridItem>
    );
  }
}

export default Scoreboard;