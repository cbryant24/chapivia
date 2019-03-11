import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import { validation } from './helpers/validators';

import { FlexItem, Field, FlexForm } from './elements';
import { OutlineButton } from './elements';
import theme from './elements/theme';
import helpers from './helpers';
import * as actions from '../actions'
import { connect } from 'react-redux';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { strict } from 'assert';
import { Object } from 'es6-shim';

//TODO: Errors message applicable to correct field only

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        touched: false,
        error: {
          status: false,
          message: ''
        }
      },
      password: {
        value: '',
        touched: false,
        show: false,
        error: {
          status: false,
          message: ''
        }
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;

    if(this.validate(name, value))
      this.setState( state => { return {
        ...state, 
        [name]: {
          ...state[name],
          value
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.data.user) 
      return this.props.history.push('/game');
  }

  handleBlur = (field) => (evt) => {
    const { value } = this.state[field];
    const valid = validation.inputValidate({ [field]: value });

    if (!this.state[field].touched) {
      this.setState( state =>  ({
        ...state, 
        [field]: {
          ...state[field],
          touched: true,
        }
      }));
    }

    if(!valid) 
      return this.setError(field, 'field')
  }

  async onSubmit(event) {
    event.preventDefault();
    const { email: {value: email }, password: {value: password} } = this.state;
    const valid = validation.authValidate({ email, password });
    debugger

    /**
     * using the errors obj returned from ajv set error state
     * ajv uses dot notation to reference property drop period to dynamically set
     */
    if (!valid) {
      validation.authValidate.errors.forEach( error => {
        const field = error.dataPath.split('.').join("");

        //SET ERROR STATE
        this.setErrors(field, 'input')
      });
      return
    }

    try {
      const res = await this.props.mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      });
    } catch(e) {
      debugger
    }
    
    return this.props.history.push('/game');
  }
  
  validate(field, value) {
    /**
     * ajv validation used to verify only valid characters specified in schema are input
     */
    const valid = validation.inputValidate({ [field]: value });

    
    if (!valid) {
      this.setState( state => { return { 
        ...state,
        [field]: {
          ...state[field],
          error: {
            status: true,
            message: `Invalid character used in ${field}`   
          }
        }
      }});

      return false
    }

    if(this.state[field].error.status) {
      this.setState( state => { return { 
        ...state,
        [field]: {
          ...state[field],
          error: {
            status: false,
            message: ''
          }
        }
      }});
    }

    return true
  }

  setError(field, type) {
    switch(type) {
      case 'character':

      case 'input':
        this.setState( state => ({
          ...state,
          [field]: {
            ...state[field],
            error: {
              status: true,
              message: `please enter a valid ${field}`
            }
          }
        }));
        break
      default:
        this.setState( state =>  ({
          ...state, 
          email: {
            ...state.email,
            error: { 
              status: false,
              message: ''
            }
          },
          password: {
            ...state.password,
            error: { 
              status: false,
              message: ''
            }
          }
        }));
    }

  }

  getErrors() {
    //returns an array of errors pulled from state and passed to error displayer
  }


  render() {

    const { email, password } = this.state;
    /**
     * checking error state for any true values to disable submit button
     * checking if either email or password field has been touch to enable submit button
     * checking if email or password length is greater than one to enable submit button
     */ 
    const isEnabled = {
      errors: Object.keys(this.state).some( property => this.state[property].error.status),
      touched: Object.keys(this.state).some( property => this.state[property].touched),
      length: Object.keys(this.state).some( property => this.state[property].value.length >= 1)
    };
    const testArr = ['hello', 'world']

    return (
      <FlexItem
        border="1px solid black"
        p="2rem"
        bg="black"
        height="55vh"
        width="40%"
        zIndex="20"
      >
        <FlexForm 
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          height="100%"
          onSubmit={(event) => this.signin(event)}
        >
          <Field 
            name="email"
            type="email"
            label="Email"
            placeholder="charles@chapman.com"
            width="75%"
            flexDirection="column"
            onBlur={ this.handleBlur('email') }
            error={testArr}
            value={email.value}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="password"
            type={ password.show ? "text" : "password" }
            label="Password"
            width="75%"
            flexDirection="column"
            onBlur={ this.handleBlur('password') }
            value={password.value}
            onChange={ event => this.handleChange(event) }
          >
          </Field>
          <OutlineButton
            color="white"
            borderColor='primary'
            mt="1rem"
            type="submit"
            width="40%"
            disabled={ !isEnabled.errors && isEnabled.touched && isEnabled.length ? false : true }
            onClick={ (e) => this.onSubmit(e) }
          >
            Sign In
          </OutlineButton>
        </FlexForm>
      </FlexItem>
      // <AuthForm errors={this.state.error} onSubmit={this.onSubmit.bind(this)}/>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(Signin)
);
