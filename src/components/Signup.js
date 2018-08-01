import React, { Component } from 'react';
import axios from 'axios';
import { FlexItem, Field } from './elements';
import { OutlineButton } from './elements';
import helpers from './helpers';
import theme from './elements/theme';

//TODO: Errors message applicable to correct field only

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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

  componentWillMount() {
    if (localStorage.getItem('token')) return this.props.history.push('/game');
  }

  async signin(event) {
    event.preventDefault()
    let { email, password, confirm_password } = this.state;

    if(!email || !password || !confirm_password ) 
      return this.setState(() => {return {error: helpers.handleError('empty')} });

    if(password !== confirm_password)
      return this.setState(() => {return {error: helpers.handleError('mismatch')} });

    try {
      const {data: {token} } = await axios.post('/api/signup', {email, password});
      if(this.state.error.statusType)
        this.setState( () => {return { error: helpers.clearError() } });

      localStorage.setItem('token', token);
      return this.props.history.push('/game');
    } catch(err) {
      this.setState( () => {return  { error: helpers.handleError(err) } });
    }
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

export default Signup;
