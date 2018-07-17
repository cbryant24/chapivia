import React, { Component } from 'react';
import { FlexItem, Field } from './elements';
import axios from 'axios';
import { OutlineButton } from './elements';
import theme from './elements/theme';

class Signin extends Component {

  signin(vals) {
    debugger
  }

  render() {
    return (
      <FlexItem
        border="1px solid black"
        p="5rem"
        bg="black"
        height="65%"
        width="40%"
      >
        <Field 
        name="email"
        type="email"
        label="Email"
        placeholder="zach@hackclub.com"
        error="can’t be blank"
        >
        </Field>
        <Field 
          name="password"
          type="password"
          label="Password"
          error="can’t be blank"
        >
        </Field>
        <OutlineButton
          color="white"
          borderColor='primary'
          mt="1rem"
          onClick={(vals) => this.signin(vals)}
        >
          Sign In
        </OutlineButton>
      </FlexItem>
    );
  }
}

export default Signin;
