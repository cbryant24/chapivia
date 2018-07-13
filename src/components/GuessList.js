import React, { Component } from 'react';
import { includes, keyBy, map } from 'lodash';
import update from 'immutability-helper';
import { GridItem, Table, OutlineButton, Input, Image, Text } from './elements';
import kgrad from '../img/kgrad.png';

class GuessList extends Component {
  constructor(props) {
    super(props);
    let vals = [{id: "0", name: "ross", answer: "b"}, {id: "1", name: "roe", answer: "c"}, {id: "2", name: "chris", answer: "a"}];
    
    let players = keyBy(vals.map(val => {
      val.editAnswer = false 
      return val}), "id");

    this.state = {
      players
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

  handleGuessChange(player) {
    const newState = update(this.state, {
      players: {[player.id]: {editAnswer: {$set: !this.state.players[player.id].editAnswer}}}
    });
    this.setState({
      ...newState
    });
  }

  componentDidUpdate() {
  }

  dispalayGuesses(players) {
    return (
      map(players, player => (
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
              fontSize="2.4rem"
              fontWeight="500"
              padding-left="2rem"
            >
              {player.name}
            </Text.span>
          </Table.td>
          <Table.td width="20%">
            {player.editAnswer ? <Input 
                                  name="password"
                                  type="password"
                                  minHeight="1.1rem"
                                  fontSize="1.1rem"
                                  width="25%"
                                  display="inline-block"
                                >
            </Input> : player.answer}
          </Table.td>
          <Table.td width="30%">
            <OutlineButton
              bg="primary"
              fontSize="1.1rem"
              borderWidth="1px"
              color="white"
              px="4px"
              py="2px"
              mr="2px"
              borderRadius="2px"
              onClick={ () => this.handleGuessChange(player)}
            >
              {player.editAnswer ? "submit" : "change"}
            </OutlineButton>
            {player.editAnswer ? <OutlineButton
              bg="primary"
              fontSize="1.1rem"
              borderWidth="1px"
              color="white"
              px="4px"
              py="2px"
              ml="2px"
              borderRadius="2px"
              onClick={ () => this.handleGuessChange(player)}
            >
              cancel
            </OutlineButton> : ""}
          </Table.td>
        </Table.tr>
      ))
    )
  }

  render() {
    return (
      < GridItem 
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid yellow"
      >
        <Table
          width="100%"
        >
          <Table.body>
            <Table.tr border="1px solid black">
              {this.displayTableHeaders(['Name', 'Guessed', ""])}
            </Table.tr>
            {this.dispalayGuesses(this.state.players)}
          </Table.body>
        </Table>
      </GridItem>
    );
  
  }
}

export default GuessList;