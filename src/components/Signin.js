import React, { useState, useRef } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import { FlexItem, ExtendedBox, BoxAnimatedPseudo, addProps, Field, Input, Flex, Text, Animated, FadeAnimations, RotateAnimations, PsuedoBox } from './element';
import theme from './elements/theme';
import helpers from './helpers';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { blockSize } from './element/utils/cssHelpers';
import { Box } from './element';
import Modal from './element/modal';

import styledCSS from '@styled-system/css';
import { isAbsolute } from 'upath';
import { noiseAnimation, glitchBottom, glitchTop, glitchMiddle } from './elements/animations';


import { keyframes, css } from 'styled-components';

//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen] = useState(false);

  //TESTING
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef();
  async function signin(event, vals) {

    const { email, password, name } = vals;
    try {
      await props.mutate({
        variables: { email, password, name },
        refetchQueries: [{ query }]
      });
    } catch(res) {
      debugger
    }
    
    return props.history.push('/game');
  }

  const toggleModal = e => {
    // debugger
    setIsOpen(!isOpen);
  }
  
  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: [1], maxHeight: '5em', justifyContent: 'space-between', flexDirection: 'column'},
      style: 'input'
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: [1], maxHeight: ['5em'], justifyContent: 'space-between', flexDirection: 'column'},
      style: 'input'
    }
  ]

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: theme.squareButton },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ]

  const form = {
    data: { name: 'signinForm', submit: 'signup', cb: signin },
    style: { 
      height: [2],
      justifyContent: 'space-around', 
      flexDirection: 'column', 
      backgroundColor: 'black',
      border: '1px solid black',
      width: [1],
      px: [2],
      zIndex: 20
    },
  }

  //TESTING
  const itChanged = (e) => {
    // debugger
    if(e.target.value === 'h') return; 

    if(e.target.name === 'email')
      return setEmail(e.target.value);
    
    return  setPassword(e.target.value)
  }

return (
  <Box id="signin-box-module" 
    fontSizeModule={[1,2]} 
    width={[2,3]}
    height={['100vh']}
    margin={['auto']}
  >
  {/* <Box
    isA="form"
    height={1}
    backgroundColor="black"
  >
    <Field
      data={{name: 'email', type: 'text', placehold: 'enter email', label: 'email'} }
      onChange={itChanged}
      value={email}
      errors={[]}
      inputStyle={inputStyle}
    />

    <Field
      data={{name: 'password', type: 'password', placehold: 'enter password', label: 'password'} }
      onChange={itChanged}
      value={password}
      errors={[]}
      inputStyle={inputStyle}
    />
    <Box name="email" onChange={itChanged} value={email} isA="input"/>
  </Box> */}
    <FormApp
      onSubmit={signin}
      form={form}
      inputs={inputs}
      validate={validate}
      buttons={buttons}
    />
  </Box>
  );
}

export default graphql(query)(
  graphql(mutation)(Signin)
);
