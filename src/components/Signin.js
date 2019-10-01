import React, { useState, useEffect } from 'react';

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import { BoxAll } from './element';
import theme from './style/theme';

import Modal from './Modal';

import { useAuth } from '../hooks';


//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen]             = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { signin, user, userLoading }                = useAuth();

  async function userSignin(event, formVals) {
    try {
      signin(formVals)
    } catch(res) {
      console.log(`this is the error message ${res}`);
      toggleModal();
      setModalMessage('Error Logging In');
      //TODO: ADD modal on login fail
    }
    
  }

  useEffect( () => {
    if (user) 
      props.history.push('/game');
  }, [user]);

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

  if (userLoading) return <div></div>;

  return (
    <BoxAll
      id="signin-box-module" 
      fontSizeModule={[4]}
      width={[2]}
      height={['75vh']}
      margin='auto'
      mt={["25%", "20%", "15%", "10%"]}
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
