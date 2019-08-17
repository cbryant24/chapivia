import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import { FlexItem, Modal, ExtendedBox, BoxAnimatedPseudo, addProps, Field, Flex, Text, Animated, FadeAnimations, RotateAnimations, PsuedoBox, ExtendedTestBox } from './element';
import theme from './elements/theme';
import helpers from './helpers';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { blockSize } from './element/utils/cssHelpers';
import { Box } from './element'

import styledCSS from '@styled-system/css';
import { isAbsolute } from 'upath';
import { noiseAnimation, glitchBottom, glitchTop, glitchMiddle } from './elements/animations';


import { keyframes, css } from 'styled-components';

//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen] = useState(false);
  
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

  const inputStyle = {
    appearance: 'none',
    display: 'block',
    verticalAlign: 'middle',
    width: '75%',
    maxWidth: '38rem',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgb(221, 225, 228)',
    transition: 'box-shadow 0.125s ease-out 0s',
    margin: '0px'
  }
  
  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { ...inputStyle }
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { ...inputStyle }
    }
  ]

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: 'squareButton' },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ]

  const form = {
    data: { name: 'signinForm', submit: 'signup', cb: signin },
    style: { height: 1, justifyContent: 'space-around', flexDirection: 'column', px: 2, fontSizeModule: [1, 2, 3, 4]},
  }

  const anim = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `

return (
    <FlexItem
      border="1px solid black"
      p={[1, 2, 3]}
      bg="black"
      width={1/2}
      zIndex="20"
      height={1}
      fontSizeModule={[1,2]}
    >
      {/* <FormApp
        height={1}
        justifyContent="space-around"
        flexDirection="column"
        px="4rem"
        name="sign-in"
        onSubmit={signin}
        form={form}
        inputs={inputs}
        validate={validate}
        buttons={buttons}
      >
      </FormApp> */}
      {/* <BoxAnimatedPseudo
        forwardedAs="p"
        pseudo
        position="relative"
        // animation={{
        //   continuous: glitchMiddle(),
        //   duration_continuous: 1,
        //   animation_timing_function: 'linear'
        // }}
        transition={{
          type: 'hover',
          from: { property: 'color', value: 'blue.3'},
          to: { property: 'color', value: 'yellow.3'}
        }}
        before={{
          content: 'Hello World',
          color: 'yellow.3',
          tranistions: {
            type: 'hover',
            from: { property: 'font-size', value: '1.3em'},
            to: { property: 'font-size', value: '2.3em'}
          }
        }}
        after={{
          content: 'Hello World',
          color: 'blue.3',
          tranistions: {
            type: 'hover',
            from: { property: 'font-size', value: '1.3em'},
            to: { property: 'font-size', value: '2.3em'}
          }
        }}
      >
        Hello World
      </BoxAnimatedPseudo> */}
      <BoxAnimatedPseudo
        pseudo 
        width="80%"
        hover={{ width: [1], fontSize: [3], color: 'yellow.3' }}
        fontSize={[2]}
        before={{
          content: 'Hello World',
          color: 'yellow.3',
          fontSize: [1],
          animation: {
            continuous: anim,
            duration_continuous: 2
          }
        }}
        border="2px solid yellow"
        // transition={{
        //   type: 'hover',
        //   from: { property: 'fontSize', value: [1,2]},
        //   to: { property: 'fontSize', value: [3, 4] }
        // }}
        transition="all 4s linear"
      >
        Hello World
        <Text fontSize={1}>GoodBye WOrld</Text>
      </BoxAnimatedPseudo>
      <button onClick={toggleModal} >Modal Action</button>
      <Modal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Box color="#ffffff">I am a modal!</Box>
        <Box color="#FF0000">I am another box in the modal</Box>
        <button onClick={toggleModal}>Close Me</button>
      </Modal>
    </FlexItem>
  );
}

export default graphql(query)(
  graphql(mutation)(Signin)
);
