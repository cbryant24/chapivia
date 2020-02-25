import React, { useState, useEffect, useCallback } from 'react';

import Form from '@cbryant24/styled-react-form';
import { signinValidation } from './validations';
import { Div, H1, H3, P } from '@cbryant24/styled-react';
import { flashingText } from './style';
import { signinFormData } from './formData';

import Modal from './Modal';

import { useAuth, useEventListener } from '../hooks';

//TODO: Errors message applicable to correct field only
function Signin(props) {
  const [isOpen, setIsOpen] = useState(false),
    { form, inputs, buttons } = signinFormData,
    [signinOpen, setSigninOpen] = useState(false),
    [modalMessage, setModalMessage] = useState(''),
    { signin, user, userLoading } = useAuth();

  async function userSignin(event, formVals) {
    try {
      await signin(formVals);
    } catch (res) {
      console.log(`the error message usersignin ${res}`);
      toggleModal();
      setModalMessage(res.graphQLErrors);
      return;
    }
  }

  useEffect(() => {
    if (user) props.history.push('/game');
  }, [user]);

  const toggleModal = e => setIsOpen(!isOpen);

  const handler = useCallback(
    ({ key }) => {
      if (key === 'Enter' || key === ' ') {
        setSigninOpen(true);
      }
    },
    [setSigninOpen]
  );

  useEventListener('keydown', handler);

  // TODO: Add loading image here
  if (userLoading) return <div></div>;

  return (
    <Div fontSizeModule={[1, null, 2, null, 3]}>
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
        >
          Chapivia
        </H1>
        <H3
          display={signinOpen ? 'none' : 'block'}
          textTransform="uppercase"
          themeStyle={['marginLargeY']}
          onClick={() => setSigninOpen(true)}
          color="primary"
          animation={flashingText}
        >
          Press Start To Play
        </H3>
        <Div display={signinOpen ? 'block' : 'none'} width={[1]}>
          <Form
            onSubmit={userSignin}
            form={form}
            inputs={inputs}
            validate={signinValidation}
            buttons={buttons}
          />
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
