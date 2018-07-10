import React, { Component } from 'react';
import { Grid, GridItem, Table } from './elements';

class Scoreboard extends Component {
  render() {
    return(
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid blue"
      >
        <Table>
          
        </Table>
        
      </GridItem>
    );
  }
}

export default Scoreboard;