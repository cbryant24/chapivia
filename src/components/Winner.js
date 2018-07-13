import React, { Component } from 'react';
import { GridItem, Image, Heading } from './elements';
import kgrad from '../img/kgrad.png';


class Winner extends Component {

  render() {
    return(
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid brown"
      >
        <Heading.h1 textTransform="uppercase">Winner</Heading.h1>
        <Image width="40%" borderRadius="9rem" src={kgrad}></Image>
        <Heading.h2
          textTransform="uppercase"
        >
          Ross
        </Heading.h2>
      </GridItem>
    )
  }
}

export default Winner;