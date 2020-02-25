import React, { useState } from 'react';
import Form from '@cbryant24/styled-react-form';
import { signupValidation } from './validations';
import { signupFormData } from './formData';

import { Div, H1, P, Button } from '@cbryant24/styled-react';
import Modal from './Modal';
import { useAuth, useRouter } from '../hooks';

//TODO: Errors message applicable to correct field only

function Signup(props) {
  const [isOpen, setIsOpen] = useState(false),
    { form, inputs, buttons } = signupFormData,
    [modalMessage, setModalMessage] = useState(''),
    { signup } = useAuth(),
    router = useRouter();

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
      </Div>
    </Div>
  );
}

export default Signup;
