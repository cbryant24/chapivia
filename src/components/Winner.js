import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { GridItem, Heading, FlexItem } from './elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Winner extends Component {
  componentWillMount() {
    this.props.getCorrectGuessers();
  }

  componentDidUpdate(prevProps) {
    if(this.props.announceAnswer && this.props.announceAnswer !== prevProps.announceAnswer) {
      this.props.getCorrectGuessers();
      debugger
    }
  }

  displayWinners() {

    return this.props.correctGuessers.map( guesser => (
      <Heading.h4
        textTransform="uppercase"
        key={guesser.id}
      >
        {guesser.name}
      </Heading.h4>
    ));
  }

  convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  render() {
    debugger
    if(!this.props.announceAnswer) return (
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid brown"
      >
        Winners and Answer will be announced at 3pm...
      </GridItem>
    )
    return(
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid brown"
      >
        <Heading.h3 textTransform="uppercase">
          {this.convertHTMLChar(this.props.triviaAnswer)}
        </Heading.h3>
        {this.displayWinners()}
      </GridItem>
    )
  }
}

const mapStateToProps = state => {
  return {
    triviaAnswer: state.trivia.triviaData.triviaAnswer,
    correctGuessers: state.players.correctGuessers,
    announceAnswer: state.game.announceAnswer,
  }
};

export default connect(mapStateToProps, actions)(Winner);