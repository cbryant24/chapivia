import React, { Component } from 'react';
import { Grid, GridItem } from './elements';

class TriviaQuestion extends Component {
  render() {
    return (
      <GridItem 
        gridRow={this.props.gridRow} 
        gridColumn={this.props.gridColumn}
        border="1px solid black"
      >

      </GridItem>
    );
  }
}

export default TriviaQuestion;