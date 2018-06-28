import React, { Component } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  grid-row: row-start / row-end;
  grid-column: column-start / column-end;
  width: 30%;
  height: 55%;
  background-color: white;
  justify-self: center;
  align-self: center;
`

class Signin extends Component {

  render() {
    return (
      <Container>Hello World</Container>
    );
  }
}

export default Signin;