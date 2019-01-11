import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { concat, shuffle } from 'lodash';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import mutation from '../mutations/Guess';
import query from '../queries/Trivia';
import * as actions from '../actions';

import { Grid, GridItem, Text, List, Item, Heading } from './elements';

class TriviaQuestion extends Component {

  displayGuesses() {
    const { choices } = this.props.data.trivia.questionChoice;

    return (
      choices.map( (choice, idx) => {
        return(
          <Item 
            pl="2rem" 
            pb="1rem" 
            key={choice}>
            {String.fromCharCode(65 + idx)}: { this.convertHTMLChar(choice) }
          </Item>
        )
      })
    );
  }

  convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }
  
  render() {
    if(new Date().getHours() < 11) return (
      <Heading.h1>Checkback after 11:00am</Heading.h1>
    );

    if(this.props.data.loading) return <div></div>
    
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
          {this.convertHTMLChar(this.props.data.trivia.question) || ""}
        </Text.p>
        <List>
          {this.displayGuesses()}
        </List>
      </GridItem>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(TriviaQuestion)
);
