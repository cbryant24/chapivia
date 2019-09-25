import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import { Link } from 'react-router-dom'

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import { FlexItem, BounceAnimations, BoxAll, ExtendedBox, BoxAnimatedPseudo, addProps, Field, Input, Flex, Text, Animated, FadeAnimations, RotateAnimations, PsuedoBox } from './element';
import theme from './style/theme';
import helpers from './helpers';

import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { blockSize } from './element/utils/cssHelpers';
import { Box } from './element';
import Modal from './Modal';

import styledCSS from '@styled-system/css';
import { noiseAnimation, glitchBottom, glitchTop, glitchMiddle } from './style/animations';

import { usePrev } from '../hooks';

import { keyframes, css } from 'styled-components';

import { MODAL_STATUS } from '../localState/Queries';

import { useAuth, user } from '../hooks';


//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // const { loading: userLoading, error, data: userData, refetch, client } = useQuery(query);
  // const { data: modalData, client } = useQuery(MODAL_STATUS);
  const [ login, { data: mutationData }] = useMutation(mutation
      // {
      //   update(cache, { data: { login }}) {
      //     // debugger
      //     cache.writeQuery({
      //       query: userData,
      //       data: { user: login }
      //     })
      //   } 
      // }
    );

  // const { data: userQuery, client } = useQuery(GET_USER);

  // const client = useApolloClient();
  // const prevUser = usePrev(userData);
  // const client = useApolloClient();
  // client.cache.writeData({ data: { user: 'value' } });

  const { signin, user } = useAuth();

  async function userSignin(event, formVals) {
    // debugger
    try {
      // await login({
      //   variables: { email, password }
      // });
      // await refetch();
      signin(formVals)

    } catch(res) {
      console.log(`this is the error message ${res}`);
      // debugger
      toggleModal();
      setModalMessage('Error Logging In');
      //TODO: ADD modal on login fail
    }
    
  }

  useEffect( () => {
    if (user) 
      props.history.push('/game');
  }, [user]);

  // useEffect( () => {if (userData.user) props.history.push('/game')});

  const toggleModal = e => setIsOpen(!isOpen);

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
    data: { name: 'signinForm', submit: 'signup', cb: userSignin },
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

  return (
    <BoxAll
      id="signin-box-module" 
      fontSizeModule={[4]}
      width={[2]}
      height={['50vh']}
      margin='auto'
      mt={["auto", "20%", "15%", "10%"]}
      maxWidth={["75vw", "50vw", "40vw"]}
      zIndex={[1]}
    >
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      <FormApp
        onSubmit={userSignin}
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
