import React, { Component } from 'react';
import axios from 'axios';
import { graphql } from 'react-apollo';

import { FlexItem, Field } from './elements';
import { OutlineButton } from './elements';
import helpers from './helpers';
import theme from './elements/theme';
import mutation from '../mutations/Signup';
import query from '../queries/UnguessedPlayers';


//TODO: Errors message applicable to correct field only

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
      error: {
        statusType: null,
        message: ''
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState( () =>   { return {[name]: value} } );
  }

  signin(event) {
    event.preventDefault()
    let { email, name, password, confirm_password } = this.state;

    if(!email || !name || !password || !confirm_password ) 
      return this.setState(() => {return {error: helpers.handleError('empty')} });

    if(password !== confirm_password)
      return this.setState(() => {return {error: helpers.handleError('mismatch')} });

    this.props.mutate({
      variables: { email, password, name },
      refetchQueries: [{ query }]
    }).catch( res => {
      debugger
      this.setState( () => {return  { error: helpers.handleError(res) } });
    });

    if(this.state.error.statusType)
        this.setState( () => {return { error: helpers.clearError() } });

    this.props.history.push('/game');
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
        <form onSubmit={(event) => this.signin(event)}>
          <Field 
            name="email"
            type="email"
            label="Email"
            placeholder="zach@hackclub.com"
            error={this.state.error.message}
            value={this.state.email}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="name"
            type="text"
            label="Name"
            placeholder="zach@hackclub.com"
            error={this.state.error.message}
            value={this.state.name}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="password"
            type="password"
            label="Password"
            error={this.state.error.message}
            value={this.state.password}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="confirm_password"
            type="password"
            label="Confirm Password"
            error={this.state.error.message}
            value={this.state.confirm_password}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <OutlineButton
            color="white"
            borderColor='primary'
            mt="1rem"
            type="submit"
            onClick={(e) => this.signin(e)}
          >
            Sign Up
          </OutlineButton>
        </form>
      </FlexItem>
    );
  }
}

export default graphql(mutation)(Signup);
