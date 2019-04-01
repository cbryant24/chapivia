import React, { Component } from 'react';
import axios from 'axios';
import { graphql } from 'react-apollo';

import { validate } from './helpers/validators';

import { FlexItem, Field, FlexForm } from './elements';
import { OutlineButton } from './elements';
import helpers from './helpers';
import theme from './elements/theme';
import mutation from '../mutations/Signup';
import query from '../queries/UnguessedPlayers';
import FormApp from './Form/App';


//TODO: Errors message applicable to correct field only

function Signup(props) {
  // const [{ fields: {name, email } }] = useStateValue();

  // handleChange(event) {
  //   const { name: field, value } = event.target;
  //   const valid = validate.input({ [field]: value });
    
  //   if(this.state.email.error.message == `${field} already in use`)
  //     this.setError('clear');

  //   if(!valid)
  //     return this.setError('character', field);
    
  //   if(this.state[field].error.status)
  //     this.setError('clear', field);

  //   if(this.state.password.error.message == "password does not match")
  //     this.setError('clear', "password")

  //   this.setState( state => { return {
  //     ...state, 
  //     [field]: {
  //       ...state[field],
  //       value
  //     }
  //   }});
  // }

  // setError( type, field = "email") {
  //   switch(type) {
  //     case 'character':
  //       this.setState( state => ({
  //         ...state,
  //         [field]: {
  //           ...state[field],
  //           error: {
  //             status: true,
  //             message: `Invalid character used in ${field}`
  //           }
  //         }
  //       }));
  //       break
  //     case 'input':
  //       this.setState( state => ({
  //         ...state,
  //         [field]: {
  //           ...state[field],
  //           error: {
  //             status: true,
  //             message: `Please enter a valid ${field}`
  //           }
  //         }
  //       }));
  //       break
  //     case 'mismatch':
  //       this.setState( state => ({
  //         ...state,
  //         [field]: {
  //           ...state[field],
  //           error: {
  //             status: true,
  //             message: `${field} does not match`
  //           }
  //         }
  //       }));
  //       break
  //     case 'duplicate':
  //       this.setState( state => ({
  //         ...state,
  //         [field]: {
  //           ...state[field],
  //           error: {
  //             sataus: true,
  //             message: `${field} already in use`
  //           }
  //         }
  //       }));
  //       break
  //     case 'clear': 
  //       this.setState( state => ({
  //         ...state,
  //         [field]: {
  //           ...state[field],
  //           error: {
  //             status: false,
  //             message: ''
  //           }
  //         }
  //       }));
  //       break
  //     default:
  //       this.setState( state =>  ({
  //         ...state, 
  //         email: {
  //           ...state.email,
  //           error: { 
  //             status: false,
  //             message: ''
  //           }
  //         },
  //         name: {
  //           ...state.name,
  //           error: {
  //             status: false,
  //             message: ''
  //           }
  //         },
  //         password: {
  //           ...state.password,
  //           error: { 
  //             status: false,
  //             message: ''
  //           }
  //         },
  //         confirmPassword: {
  //           ...state.confirmPassword,
  //           error: {
  //             status: false,
  //             message: ''
  //           }
  //         }
  //       }));
  //   }
  // }

  // handleBlur = (field) => (evt) => {
  //   const { value } = this.state[field];
  //   const valid = validate.blur({ [field]: value });

  //   if (!this.state[field].touched) {
  //     this.setState( state =>  ({
  //       ...state, 
  //       [field]: {
  //         ...state[field],
  //         touched: true,
  //       }
  //     }));
  //   }

  //   if(!valid) 
  //     return this.setError('input', field);

  //   if(this.state[field].error.status)
  //     return this.setError('clear', field);
  // }

  function signup(event, vals) {
    
    const { email: { value: email }, name: { value: name } } = vals;
    debugger
    // const [{ fields: { name, email } }] = useStateValue();

    event.preventDefault()
    // const { 
    //   email: { value: email },
    //   name: { value: name },
    //   password: { value: password },
    //   confirmPassword: { value: confirmPassword }
    // } = this.state;

    // const valid = validate.signup({ email, name, password, confirmPassword });

    // if (!valid) {
    //   validate.signup.errors.forEach( error => {
    //     const field = error.dataPath.split('.').join("");
    //     this.setError('input', field);
    //   });
    //   return
    // }

    // if(password !== confirmPassword)
    //   return this.setError('mismatch', 'password');

    // try {
    //   const result = await this.props.mutate({
    //     variables: { email, password, name },
    //     refetchQueries: [{ query }]
    //   });
    // } catch(res) {
    //   debugger
    //   return this.setError('duplicate');
    // }
    
    // this.setError();

    // return this.props.history.push('/game');
  }

  // testButtonCB() {
  //   debugger
  // }

  // const { email, name, password, confirmPassword } = this.state;

  // const isEnabled = {
  //   errors: Object.keys(this.state).some( property => this.state[property].error.status),
  //   touched: Object.keys(this.state).some( property => this.state[property].touched),
  //   length: Object.keys(this.state).some( property => this.state[property].value.length < 1)
  // };
  
  // const errorMessages = Object.keys(this.state)
  //                       .map( prop => this.state[prop].error.message ).filter( msg => msg );
  
  const inputs = [
    {
      data: { type: 'input', name: 'name', label: 'name', placeholder: 'enter name' }, 
      flexStyle: { width: '75%', maxHeight: '3rem', height: '3rem', justifyContent: 'space-around' },
      inputStyle: { color: '#ff0000'},
    },
    {
      data: { type: 'input', name: 'email', label: 'email', placeholder: 'enter email' },
      flexStyle: { width: '75%', maxHeight: '3rem', height: '3rem', justifyContent: 'space-between' },
      inputStyle: { color: '#ff00f3' }
    }
  ]
  const form = {
    data: { submit: signup, cancel: null, buttons: [{cancel: 'testButtonCB'}] },
    style: { height: '50vh', justifyContent: 'space-around', flexDirection: 'column', px: '4rem' },
  }

  // return {
    // const { email, name, password, confirmPassword } = this.state;

    // const isEnabled = {
    //   errors: Object.keys(this.state).some( property => this.state[property].error.status),
    //   touched: Object.keys(this.state).some( property => this.state[property].touched),
    //   length: Object.keys(this.state).some( property => this.state[property].value.length < 1)
    // };
    
    // const errorMessages = Object.keys(this.state)
    //                       .map( prop => this.state[prop].error.message ).filter( msg => msg );
    
    // const inputs = [
    //   {
    //     data: { type: 'input', name: 'name', label: 'name', placeholder: 'enter name' }, 
    //     flexStyle: { width: '75%', maxHeight: '3rem', height: '3rem', justifyContent: 'space-around' },
    //     inputStyle: { color: '#ff0000'},
    //   },
    //   {
    //     data: { type: 'input', name: 'email', label: 'email', placeholder: 'enter email' },
    //     flexStyle: { width: '75%', maxHeight: '3rem', height: '3rem', justifyContent: 'space-between' },
    //     inputStyle: { color: '#ff00f3' }
    //   }
    // ]
    // const form = {
    //   data: { submit: this.signup, cancel: null, buttons: [{cancel: this.testButtonCB}] },
    //   style: { height: '50vh', justifyContent: 'space-around', flexDirection: 'column', px: '4rem' },
    // }
  return (
    <FlexItem
      border="1px solid black"
      p="2rem"
      bg="black"
      width="40%"
      zIndex="20"
    >
      <FormApp 
        form={form}
        inputs={inputs}
      />
      {/* <FlexForm
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        height="100%"
        px="4rem"
        onSubmit={(event) => this.signup(event)}
      >
        <Field 
          name="email"
          type="email"
          label="Email"
          flexDirection="column"
          justifyContent="space-between"
          width="75%"
          placeholder="charles@chapman.com"
          error={ errorMessages }
          value={email.value}
          onBlur={ this.handleBlur('email') }
          onChange={(event) => this.handleChange(event)}
        >
        </Field>
        <Field 
          name="name"
          type="text"
          label="Name"
          width="75%"
          flexDirection="column"
          justifyContent="space-between"
          placeholder="charles chapman"
          value={name.value}
          onBlur={ this.handleBlur('name') }
          onChange={(event) => this.handleChange(event)}
        >
        </Field>
        <Field 
          name="password"
          type="password"
          label="Password"
          width="75%"
          flexDirection="column"
          justifyContent="space-between"
          value={password.value}
          onBlur={ this.handleBlur('password') }
          onChange={(event) => this.handleChange(event)}
        >
        </Field>
        <Field 
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          width="75%"
          flexDirection="column"
          justifyContent="space-between"
          value={confirmPassword.value}
          onBlur={ this.handleBlur('confirmPassword') }
          onChange={(event) => this.handleChange(event)}
        >
        </Field>
        <OutlineButton
          color="white"
          borderColor='primary'
          mt="1rem"
          type="submit"
          width="40%"
          disabled={ !isEnabled.errors && isEnabled.touched && !isEnabled.length ? false : true }
          onClick={(e) => this.signup(e)}
        >
          Sign Up
        </OutlineButton>
      </FlexForm> */}
    </FlexItem>
  );
}

export default graphql(mutation)(Signup);
