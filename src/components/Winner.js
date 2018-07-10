import React, { Component } from 'react';
import { GridItem } from './elements';


class Winner extends Component {

  render() {
    return(
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid brown"
      >

      </GridItem>
    )
  }
}

export default Winner;