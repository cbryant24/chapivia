import React, { Component } from 'react';
import { Grid, GridItem } from './elements';

class GuessForm extends Component {
  render() {
    return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        Hello World
      </GridItem>
    );
  }
}

export default GuessForm;