import React, { Component } from 'react';
import { concat, shuffle } from 'lodash';
import { Grid, GridItem, Text, List, Item } from './elements';

class TriviaQuestion extends Component {
  constructor(props) {
    super(props);
    const dailyTrivia = {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question: "Which movie sequel had improved box office results compared to its original film?",
      correct_answer: "Toy Story 2",
      incorrect_answers: [
        "Sin City: A Dame to Kill For",
        "Speed 2: Cruise Control",
        "Son of the Mask"
      ]
    };
    this.state = {
      dailyTrivia
    };
  }

  displayGuesses({incorrect_answers, correct_answer}) {
    const guesses = shuffle(concat(incorrect_answers, correct_answer));
    return (
      guesses.map( choice => {
        return(
          <Item pl="2rem" pb="1rem" key={choice}>{choice}</Item>
        )
      })
    )
  }
  
  render() {
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
          {this.state.dailyTrivia.question}
        </Text.p>
        <List>
          {this.displayGuesses(this.state.dailyTrivia)}
        </List>
      </GridItem>
    );
  }
}

export default TriviaQuestion;