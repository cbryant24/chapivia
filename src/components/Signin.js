import React, { useState, useEffect } from 'react';

import Form from '@cbryant24/styled-react-form';
import { signinValidation } from './validations';
import { Div, Field, H1 } from '@cbryant24/styled-react';
import theme from './style/theme';

import Modal from './Modal';

import { useAuth, useAsync } from '../hooks';


//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen]       = useState(false),
  [modalMessage, setModalMessage] = useState(''),
  { signin, user, userLoading }   = useAuth();
  const { execute, pending, value, error } = useAsync(signin, false);



  async function userSignin(event, formVals) {
    try {
      signin(formVals)
    } catch(res) {
      console.log(`the error message usersignin ${res}`);
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
      fieldStyle: 'field',
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { themeStyle: 'inputMain' }
    }
  ];

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3] }},
    { text: 'Cancel', type: 'cancel', cb: null, style: {themeStyle: 'squareButton' } }
  ];

  const form = {
    data: { name: 'signinForm', submit: 'signup' },
    style: { themeStyle: 'authForm' }
  }

  // TODO: Add loading image here
  if (userLoading) return <div></div>;

  return (
    <Div
      id="signinboxmodule"
      width={[1]}      
    >
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      <H1>Galaga</H1>
      <Div
        //display="none"
      >
        <Form
          onSubmit={userSignin}
          form={form}
          inputs={inputs}
          validate={signinValidation}
          buttons={buttons}
        />
      </Div>
      {/* <Field
        fieldStyle={{themeStyle: 'field'}}
      /> */}
    </Div>
  );
}

export default Signin;