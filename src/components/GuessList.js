import React, { Component } from 'react';
import { includes, keyBy, map } from 'lodash';
import { update } from 'immutability-helper';
import { GridItem, Table, Button, Field } from './elements';

class GuessList extends Component {
  constructor(props) {
    super(props);
    let vals = [{id: "0", name: "ross", answer: "b"}, {id: "1", name: "roe", answer: "c"}, {id: "2", name: "chris", answer: "a"}];
    
    let players = keyBy(vals.map(val => {
      val.editAnswer = false 
      return val}), "id");

    this.state = {
      players: {
        ...players
      }
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
    debugger
    const players = {
      ...this.state.players,
      ...player.editAnswer = true
    }
    // const newState = update(this.state, {players: { [player.id]: { editAnswer: {$set: true} } } } )
    this.setState({
      players
    })
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
          <Table.td>{player.name}</Table.td>
          <Table.td>
            {player.editAnswer ? <Field 
                            name="password"
                            type="password"
                            minHeight="1.1rem"
                            fontSize="1.1rem"
                            width="25%"
                            display="inline-block"
                          >
            </Field> : player.answer}
          </Table.td>
          <Table.td>
            <Button.button
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
            </Button.button>
            {player.editAnswer ? <Button.button
              bg="primary"
              fontSize="1.1rem"
              borderWidth="1px"
              color="white"
              px="4px"
              py="2px"
              ml="2px"
              borderRadius="2px"
              onClick={ () => this.handleGuessChange()}
            >
              cancel
            </Button.button> : ""}
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
              {this.displayTableHeaders(['Name', 'Guessed', 'Edit'])}
            </Table.tr>
            {this.dispalayGuesses(this.state.players)}
          </Table.body>
        </Table>
      </GridItem>
    );
  
  }
}

export default GuessList;