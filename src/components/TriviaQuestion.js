import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { concat, shuffle } from 'lodash';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Grid, GridItem, Text, List, Item, Heading } from './elements';

class TriviaQuestion extends Component {

  async componentWillMount() {
    this.props.getTrivia();
  }

  displayGuesses() {

    const triviaChoices = this.props.trivia.triviaChoices || [];

    return (
      triviaChoices.map( (choice, idx) => {
        return(
          <Item 
            pl="2rem" 
            pb="1rem" 
            key={choice}>
            {String.fromCharCode(65 + idx)}: { this.convertHTMLChar(choice) }
          </Item>
        )
      })
    )
  }

  convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }
  
  render() {
    debugger
    if(!this.props.gameStatus) return (
      <Heading.h1>Checkback after 11:00am</Heading.h1>
    )
    return (
      <GridItem 
        gridRow={this.props.gridRow} 
        gridColumn={this.props.gridColumn}
        border="1px solid black"
        flexDirection="column"
      >
        <Text.p
          p="2rem"
          fontSize="2.1rem"
        >
          {this.convertHTMLChar(this.props.trivia.triviaQuestion) || ""}
        </Text.p>
        <List>
          {this.displayGuesses()}
        </List>
      </GridItem>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trivia: state.trivia.triviaData,
    gameStatus: state.game.gameStatus
  }
}

export default connect(mapStateToProps, actions)(TriviaQuestion);