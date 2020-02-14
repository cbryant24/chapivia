import React, { useState } from 'react';
import Form from '@cbryant24/styled-react-form';
import { signupValidation } from './validations';

import { Div, H1, P, Button } from '@cbryant24/styled-react';
import Modal from './Modal';
import { useAuth, useRouter } from '../hooks';

//TODO: Errors message applicable to correct field only

function Signup(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  async function userSignup(event, formVals) {
    try {
      await signup(formVals);
    } catch (res) {
      toggleModal();
      setModalMessage(res.graphQLErrors);
      return;
    }
    return router.push('/game');
  }

  const toggleModal = e => setIsOpen(!isOpen);

  const inputs = [
    {
      data: {
        type: 'input',
        name: 'name',
        label: 'name',
        placeholder: 'enter name',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'email',
        name: 'email',
        label: 'email',
        placeholder: 'enter email',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'password',
        name: 'password',
        label: 'password',
        placeholder: 'enter password',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'password',
        name: 'confirm password',
        label: 'confirm password',
        placeholder: 'reenter password',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    }
  ];

  const buttons = [
    {
      text: 'Submit',
      type: 'submit',
      cb: null,
      style: { themeStyle: 'squareButton', mr: [3] },
      disabledStyle: { themeStyle: 'disabledSquareButton', mr: [3] }
    },
    {
      text: 'Cancel',
      type: 'cancel',
      cb: null,
      style: { themeStyle: 'squareButton' }
    }
  ];

  const form = {
    data: { name: 'signupForm', submit: 'signup' },
    style: {
      themeStyle: [
        'authForm',
        'flexSpaceBetweenColumn',
        'marginBottomMedium',
        'paddingMedium'
      ],
      remove: 'height',
      height: '50em'
    }
  };

  return (
    <Div fontSizeModule={[1, null, 2, null, 3]}>
      <Div
        id="signupboxmodule"
        width={[1]}
        themeStyle={['flexCenterSpaceEvenlyColumn', 'marginTopLarge']}
      >
        <Modal
          isOpen={isOpen}
          modalMessage={modalMessage}
          toggleModal={toggleModal}
        />
        <H1 color="secondary">Chapivia</H1>
        <Form
          onSubmit={userSignup}
          form={form}
          inputs={inputs}
          validate={signupValidation}
          buttons={buttons}
        />
        <Div textTransform="uppercase">
          <P>&copy; 2019 Chapivia LTD.</P>
          <P>All Rights Reserver</P>
        </Div>
        <Button themeStyle="squareButton" onClick={toggleModal}>
          Click ME
        </Button>
      </Div>
    </Div>
  );
}

export default Signup;
