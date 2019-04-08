import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

import AuthForm from './AuthForm';
import { validate } from './helpers/validators';

import { FlexItem, Field, FlexForm, Flex } from './elements';
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
    const { name: field, value } = event.target;
    const valid = validate.input({ [field]: value });
    
    if(this.state.email.error.message == "Invalid email and or password")
      this.setError('clear');

    if(!valid)
      return this.setError('character', field);
    
    // if(this.state[field].error.status)
    //   this.setError('clear', field)

    this.setState( state => { return {
      ...state, 
      [field]: {
        ...state[field],
        value,
        error: {
          status: false,
          message: ''
        }
      }
    }});
  }

  componentDidUpdate(prevProps) {
    if(this.props.data.user) 
      return this.props.history.push('/game');
  }

  handleBlur = (field) => (event) => {
    const { value } = this.state[field];
    const valid = validate.blur({ [field]: value });

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
      return this.setError('input', field);

    if(this.state[field].error.status)
      return this.setError('clear', field);
  }

  async onSubmit(event) {
    event.preventDefault();
    const { email: { value: email }, password: { value: password } } = this.state;
    const valid = validate.signin({ email, password });

    /**
     * using the errors obj returned from ajv set error state
     * ajv uses dot notation to reference property drop period to dynamically set
     */
    if (!valid) {
      validate.signin.errors.forEach( error => {
        const field = error.dataPath.split('.').join("");
        this.setError('input', field);
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
      return this.setError('login')
    }
    
    return this.props.history.push('/game');
  }

  setError( type, field = "email") {
    switch(type) {
      case 'character':
        this.setState( state => ({
          ...state,
          [field]: {
            ...state[field],
            error: {
              status: true,
              message: `Invalid character used in ${field}`
            }
          }
        }));
        break
      case 'input':
        this.setState( state => ({
          ...state,
          [field]: {
            ...state[field],
            error: {
              status: true,
              message: `Please enter a valid ${field}`
            }
          }
        }));
        break
      case 'login':
        this.setState( state => ({
          ...state,
          [field]: {
            ...state[field],
            error: {
              status: true,
              message: `Invalid email and or password`
            }
          }
        }));
        break
      case 'clear': 
        this.setState( state => ({
          ...state,
          [field]: {
            ...state[field],
            error: {
              status: false,
              message: ''
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
      length: Object.keys(this.state).some( property => this.state[property].value.length < 1)
    };
    
    const errorMessages = Object.keys(this.state)
                          .map( prop => this.state[prop].error.message ).filter( msg => msg );
    return (
      <FlexItem
        border="1px solid black"
        p="2rem"
        bg="black"
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
            error={ errorMessages }
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
            disabled={ !isEnabled.errors && isEnabled.touched && !isEnabled.length ? false : true }
            onClick={ (e) => this.onSubmit(e) }
          >
            Sign In
          </OutlineButton>
        </FlexForm>
        <Flex
          my="2rem"
          flexDirection="column"
        >
          <Link to="/signup">Click here to signup</Link>
          <Link to="/signup">Forgotten Password</Link>
        </Flex>
      </FlexItem>
      // <AuthForm errors={this.state.error} onSubmit={this.onSubmit.bind(this)}/>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(Signin)
);
