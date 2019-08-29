import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as Element from './element';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      name: '',
      email: '', 
      password: '',
      confirmPassword: '',
      error: {
        type: '',
        message: ''
      }
    };
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState( () =>   { return { [name]: value } } );
  }

  onsubmit(event) {
    event.preventDefault();

   this.props.submit(this.state); 
  }

  render() {
    return (
      <Element.Flex>
        <Element.FlexForm isA="form">
          <Element.Field
              name="email"
              type="email"
              label="Email"
              maxHeight="3rem"
              justifyContent="space-between"
              width="70%"
              placeholder="zach@hackclub.com"
              error={this.state.error.message}
              value={this.state.email}
              onChange={(event) => this.handleInputChange(event)}
            />
            <Element.Field
              name="name"
              type="text"
              label="Name"
              width="70%"
              maxHeight="3rem"
              justifyContent="space-between"
              placeholder="charles@chapman.com"
              error={this.state.error.message}
              value={this.state.name}
              onChange={(event) => this.handleChange(event)}
            />
            <Element.Field
              name="password"
              type="password"
              label="Password"
              width="70%"
              maxHeight="3rem"
              justifyContent="space-between"
              error={this.state.error.message}
              value={this.state.password}
              onChange={(event) => this.handleChange(event)}
            />
            <Element.Field
              name="confirm_password"
              type="password"
              label="Confirm Password"
              width="70%"
              maxHeight="3rem"
              justifyContent="space-between"
              error={this.state.error.message}
              value={this.state.confirm_password}
              onChange={(event) => this.handleChange(event)}
            />
            <Element.OutlineButton
              color="white"
              borderColor='primary'
              mt="1rem"
              type="submit"
              width="25%"
              onClick={(e) => this.signin(e)}
            >
              Submit
            </Element.OutlineButton>
            <Element.OutlineButton
              color="white"
              width="25%"
              borderColor='primary'
              textAlign="center"
              height="75%"
              p="0"
              type="cancel"
              value="Cancel"
            >
              Cancel
            </Element.OutlineButton>
          </Element.FlexForm>
      </Element.Flex>
    );
  }
}

export default withRouter(AuthForm);