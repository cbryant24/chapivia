import React, { useState, useEffect, useCallback } from 'react';

import Form from '@cbryant24/styled-react-form';
import { signinValidation } from './validations';
import { Div, H1, H3, P } from '@cbryant24/styled-react';
import { theme}  from './style';
import { flashingText } from './style';
import { NavLink } from 'react-router-dom';

import Modal from './Modal';

import { useAuth, useEventListener } from '../hooks';


//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen]       = useState(false),
  [signinOpen, setSigninOpen]     = useState(false),
  [modalMessage, setModalMessage] = useState(''),
  { signin, user, userLoading }   = useAuth();

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

  const handler = useCallback(
    ({ key }) => {
      if (key === "Enter" || key === " ") setSigninOpen(true);
    }, [setSigninOpen]
  );

  useEventListener('keydown', handler);

  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    }
  ];

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3] }},
    { text: 'Cancel', type: 'cancel', cb: null, style: {themeStyle: 'squareButton' } }
  ];

  const form = {
    data: { name: 'signinForm', submit: 'signup' },
    style: { themeStyle: ['authForm', 'flexSpaceBetweenColumn', 'marginBottomMedium', 'paddingMedium'] }
  };

  // TODO: Add loading image here
  if (userLoading) return <div></div>;

  return (
    <Div
      fontSizeModule={[1, null, 2, null, 3]}
    >
      <Div
        id="signinboxmodule"
        width={[1]}
        themeStyle={['flexCenterSpaceEvenlyColumn', 'marginTopLarge']}
      >
        <Modal
          isOpen={isOpen}
          modalMessage={modalMessage}
          toggleModal={toggleModal}
        />
        <H1
          themeStyle={signinOpen ? ['marginBottomSmall'] : ['marginTopSmall']}
          color="secondary"
        >Chapivia</H1>
        <H3 
          display={ signinOpen ? "none" : "block" }
          textTransform="uppercase"
          themeStyle={['marginLargeY']}
          onClick={ () => setSigninOpen(true)}
          color="primary"
          animation={{
            in: flashingText(),
            duration_in: 1,
            continuous: flashingText(),
            duration_continuous: 1
          }}
        >Press Start To Play</H3>
        <Div
          display={ signinOpen ? "block" : "none" }
          width={[1]}
        >
          <Form
            onSubmit={userSignin}
            form={form}
            inputs={inputs}
            validate={signinValidation}
            buttons={buttons}
          />
          <NavLink fontSize="100px" to="/signup">Click Here To Signup!</NavLink>
        </Div>
        <Div textTransform="uppercase">
          <P>&copy; 2019 Chapivia LTD.</P>
          <P>All Rights Reserver</P>
        </Div>
      </Div>
    </Div>

  );
}

export default Signin;