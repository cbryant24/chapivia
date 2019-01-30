import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { FlexItem, Field, FlexForm } from './elements';
import { OutlineButton } from './elements';
import theme from './elements/theme';
import helpers from './helpers';
import * as actions from '../actions'
import { connect } from 'react-redux';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

//TODO: Errors message applicable to correct field only

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

  componentDidUpdate(prevProps) {

    if(this.props.errorMessage)
      return this.setState(() => {return {...this.state, error: helpers.handleError('invalid')} });

    if(this.props.data.user) 
      return this.props.history.push('/game');
  }

  async signin(event) {
    event.preventDefault();
    const { email, password } = this.state;


    if (!email || !password )
      return this.setState(() => {return {...this.state, error: helpers.handleError('blank')} });

    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch( res => {
      debugger
    });

    if(this.state.error.statusType)
        this.setState( () => {return { error: helpers.clearError() }});
  }



  render() {
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
          error={this.state.error.message}
          value={this.state.email}
          onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <Field 
            name="password"
            type="password"
            label="Password"
            width="75%"
            value={this.state.password}
            onChange={(event) => this.handleChange(event)}
          >
          </Field>
          <OutlineButton
            color="white"
            borderColor='primary'
            mt="1rem"
            type="submit"
            width="40%"
            onClick={(e) => this.signin(e)}
          >
            Sign In
          </OutlineButton>
        </FlexForm>

      </FlexItem>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { errorMessage: state.auth.errorMessage };
// }

// export default connect(mapStateToProps, actions)(Signin);

export default graphql(query)(
  graphql(mutation)(Signin)
);
