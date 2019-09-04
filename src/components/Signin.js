import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import { FlexItem, BounceAnimations, BoxAll, ExtendedBox, BoxAnimatedPseudo, addProps, Field, Input, Flex, Text, Animated, FadeAnimations, RotateAnimations, PsuedoBox } from './element';
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

import { usePrev } from '../hooks';

import { keyframes, css } from 'styled-components';

//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { loading, error, data: queryData } = useQuery(query);
  const [ login, { data: mutationData }] = useMutation(mutation);
  const prevUserState = usePrev(queryData)


  async function signin(event, formVals) {
    // debugger
    const { email, password } = formVals;
    try {
      await login({
        variables: { email, password },
        refetchQueries: [{ query }]
      });
      // debugger
      props.history.push('/game');
      return
    } catch(res) {
      // debugger
      console.log(`this is the error message ${res}`);
      debugger
      setIsOpen(true);
      setModalMessage('Error Logging In');
      //TODO: ADD modal on login fail
    }
    
  }

  useEffect( () => {
    console.log(props)
    if (loading) return;

    console.log(prevUserState)
    debugger
    
    if (props.data.user) return props.history.push('/game');
  }, [queryData]);

  const toggleModal = e => setIsOpen(!isOpen);

  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: [1], height: ['25%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: [1], height: ['25%'], justifyContent: 'space-between', flexDirection: 'column'},
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
      px: [4],
      zIndex: 20
    },
  }


  if (loading) return;

  return (
    <BoxAll
      id="signin-box-module" 
      fontSizeModule={[4]}
      width={[2]}
      height={['65vh']}
      margin='auto'
      mt={["auto", "20%", "15%", "10%"]}
      maxWidth={["75vw", "50vw", "40vw"]}
      zIndex={[1]}
    >
      <Modal
        id="chapivia-modal"
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <BoxAll
          pseudo
          display="flex"
          fontSizeModule={[3]}
          flexDirection="column"
          justifyContent="space-evenly"
          backgroundColor="black"
          color="white"
          width={["50vw", "25vw"]}
          height={["25vh"]}
          margin="auto"
          transform="translateY(-500px)"
          animation={{
            in: BounceAnimations.BounceInTop,
            duration_in: 1,
            animation_fill_mode: 'both'
          }}
        >
          <Text
            isA="h3"
            fontSize={[3,4]}
            textAlign="center"
            my={[4]}
          >
            {modalMessage}
          </Text>
          <FlexItem
            isA="button"
            themeStyle="squareButton"
            width="5em"
            alignSelf="flex-end"
            mr={4}
            onClick={toggleModal}
          >
            Close
          </FlexItem>
        </BoxAll>
      </Modal>
      <FormApp
        onSubmit={signin}
        form={form}
        inputs={inputs}
        validate={validate}
        buttons={buttons}
      />
    </BoxAll>
  );
}

export default Signin;

// export default graphql(query)(
//   graphql(mutation)(Signin)
// );
