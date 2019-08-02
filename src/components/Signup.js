import React, { Component } from 'react';
import axios from 'axios';
import { graphql } from 'react-apollo';

import { FlexItem } from './element';
import theme from './elements/theme';
import mutation from '../mutations/Signup';
import query from '../queries/UnguessedPlayers';
import FormApp from './Form/App';
import { validate } from './helpers/validators'


//TODO: Errors message applicable to correct field only

function Signup(props) {
  
  async function signup(event, vals) {

    const { email, password, name } = vals;
    try {
      const result = await props.mutate({
        variables: { email, password, name },
        refetchQueries: [{ query }]
      });
    } catch(res) {
      debugger
    }
    
    return props.history.push('/game');
  }
  
  const inputs = [
    {
      data: { type: 'input', name: 'name', label: 'name', placeholder: 'enter name', required: true }, 
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-around', flexDirection: 'column' },
      inputStyle: { color: '#ff0000'},
    },
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { color: '#ff00f3' }
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { color: '#ff00f3' }
    },
    {
      data: { type: 'password', name: 'confirm password', label: 'confirm password', placeholder: 'reenter password', required: true },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { color: '#ff00f3' }
    }
  ]
  const form = {
    data: { name: 'signupForm', submit: 'signup', cb: signup },
    style: { height: '60vh', justifyContent: 'space-around', flexDirection: 'column', px: '4rem',  },
  }

return (
    <FlexItem
      border="1px solid black"
      p="2rem"
      bg="black"
      width="60%"
      zIndex="20"
    >
      <FormApp 
        form={form}
        inputs={inputs}
        validate={validate}
      />
    </FlexItem>
  );
}

export default graphql(query)(
  graphql(mutation)(Signup)
);