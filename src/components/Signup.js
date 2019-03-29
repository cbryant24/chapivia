import React, { Component } from 'react';
import axios from 'axios';
import { graphql } from 'react-apollo';

import { FlexItem, Field, FlexForm } from './elements';
import { OutlineButton } from './elements';
import helpers from './helpers';
import theme from './elements/theme';
import mutation from '../mutations/Signup';
import query from '../queries/UnguessedPlayers';

import Form from './Form';

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
    this.setState( () =>   { return {[name]: value } } );
  }

  async signin(event) {
    debugger
  //   event.preventDefault()
  //   let { email, name, password, confirm_password } = this.state;

  //   if(!email || !name || !password || !confirm_password ) 
  //     return this.setState(() => {return {error: helpers.handleError('empty')} });

  //   if(password !== confirm_password)
  //     return this.setState(() => {return {error: helpers.handleError('mismatch')} });

  //   try {
  //     const result = await this.props.mutate({
  //       variables: { email, password, name },
  //       refetchQueries: [{ query }]
  //     });
  //   } catch(res) {
  //     debugger
  //     return this.setState(() => { return {error: { statusType: "user", message: res.message } } })
  //   }
    
  //   if(this.state.error.statusType)
  //       this.setState( () => {return { error: helpers.clearError() } });

  //   return this.props.history.push('/game');
  }

  testButtonCB() {
    debugger
  }

  render() {
    const inputs = [
      {
        data: { type: 'input', name: 'name', label: 'name', placeholder: 'enter name' }, 
        flexStyle: { width: '75%', maxHeight: '3rem', height: '3rem', justifyContent: 'space-around' },
        inputStyle: { color: '#ff0000'},
      },
      {
        data: { type: 'input', name: 'email', label: 'email', placeholder: 'enter email' },
        flexStyle: { width: '75%', maxHeight: '3rem', height: '3rem', justifyContent: 'space-between' },
        inputStyle: { color: '#ff00f3'}
      }
    ]
    const form = {
      data: { submit: this.signin, cancel: null, buttons: [{cancel: this.testButtonCB}] },
      style: { height: '50vh', justifyContent: 'space-around', flexDirection: 'column', px: '4rem' },
    }
    
    return (
      <FlexItem
        border="1px solid black"
        bg="black"
        height="50vh"
        width="40%"
        zIndex="10"
        flexDirection="column"
      >
        <Form 
          form={form}
          inputs={inputs}
        />
        {/* <FlexForm
          height="50vh"
          justifyContent="space-around"
          flexDirection="column"
          px="4rem"
          onSubmit={(event) => this.signin(event)}
        >
          <Field 
            name="email"
            type="email"
            label="Email"
            maxHeight="3rem"
            justifyContent="space-between"
            width="70%"
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
            width="70%"
            maxHeight="3rem"
            justifyContent="space-between"
            placeholder="charles@chapman.com"
            error={this.state.error.message}
            value={this.state.name}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="password"
            type="password"
            label="Password"
            width="70%"
            maxHeight="3rem"
            justifyContent="space-between"
            error={this.state.error.message}
            value={this.state.password}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="confirm_password"
            type="password"
            label="Confirm Password"
            width="70%"
            maxHeight="3rem"
            justifyContent="space-between"
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
            width="25%"
            onClick={(e) => this.signin(e)}
          >
            Sign Up
          </OutlineButton>
        </FlexForm> */}
      </FlexItem>
    );
  }
}

export default graphql(mutation)(Signup);
