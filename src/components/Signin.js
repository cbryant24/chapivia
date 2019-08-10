import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import { FlexItem, addProps, Field, Flex, Text, Animated, FadeAnimations, RotateAnimations, PsuedoBox } from './element';
import theme from './elements/theme';
import helpers from './helpers';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { blockSize } from './element/utils/cssHelpers';
import { Box } from './element'
import Modal from './element/modal';

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

return (
    <FlexItem
      border="1px solid black"
      p={[1, 2, 3]}
      bg="black"
      width={1/2}
      zIndex="20"
      height={1}
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
      <PsuedoBox
        psuedoClass={{
          type: 'link',
          display: 'block',
          color: 'red',
        }}
      >
        <Box forwardedAs="a">Google Me</Box>
        <Text>Bing</Text>
        <Box forwardedAs="a">Yahoo!</Box>
      </PsuedoBox>

      <PsuedoBox
        psuedoClass={{
          type: 'last-child',
          additionalSelector: 'p',
          display: 'block',
          color: 'red',
          fontSize: [1, 2]
        }}
      >
        <Text fontSize={3} color="blue" forwardedAs="p">Schoolboy Q</Text>
        <Text fontSize={3} color="blue" forwardedAs="p">Kanye West</Text>
        <Text fontSize={3} color="blue" forwardedAs="p">Kid Cudi</Text>
        <Text fontSize={3} color="blue" forwardedAs="p">a$ap Rocky</Text>
        <Text forwardedAs="p">Travis Scott</Text>
      </PsuedoBox>
      
      <PsuedoBox
        psuedoClass={{
          type: 'not',
          additionalSelector: 'p',
          display: 'block',
          width: [1 / 1],
        }}
      >
        <Text as="p">House</Text>
        <Text as="p">Car</Text>
        <Box as="span">Television</Box>
      </PsuedoBox>

      <PsuedoBox
        psuedoClass={{
          type: 'hover',
          additionalSelector: '#val',
          display: 'block',
          color: 'yellow',
          referBack: true
        }}
      >
        <Text as="p">House</Text>
        <Text as="p">Car</Text>
        <Box id="val">Television</Box>
      </PsuedoBox>
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
