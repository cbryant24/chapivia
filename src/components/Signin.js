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

  async function signin(event, formVals) {

    const { email, password } = formVals;
    try {
      await props.mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      });
    } catch(res) {
      debugger
    }
    
    return props.history.push('/game');
  }

  const toggleModal = e => setIsOpen(!isOpen);
  
  const testButton = () => {
    // debugger
    console.log('hello world')
  }

  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    }
  ]

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3]} },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ]

  const form = {
    data: { name: 'signinForm', submit: 'signup', cb: signin },
    style: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-evenly', 
      flexDirection: 'column', 
      backgroundColor: 'black',
      border: '1px solid black',
      width: [1],
      px: [2],
      zIndex: 20
    },
  }

return (
  <Box id="signin-box-module" 
    fontSizeModule={[1,2]}
    width={[2,3]}
    height={['65vh']}
    margin='auto'
    zIndex={[1]}
  >
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
