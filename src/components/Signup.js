import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import theme from './elements/theme';

import { FlexItem, BoxAll, BounceAnimations, Text } from './element';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import FormApp from './Form/App';
import { validate } from './helpers/validators';
import Modal from './Modal';

//TODO: Errors message applicable to correct field only

function Signup(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [ userSignup ] = useMutation(mutation);
  const { data, refetch } = useQuery(query);
  
  async function signup(event, formVals) {

    const { email, password, name } = formVals;
    try {
      await userSignup({
        variables: { email, password, name}
      });
      await refetch();
  
      return props.history.push('/game');

    } catch(res) {
      debugger
      toggleModal();
      setModalMessage('Error Signing Up');
    }
  }
  
  const toggleModal = e => setIsOpen(!isOpen);

  const inputs = [
    {
      data: { type: 'input', name: 'name', label: 'name', placeholder: 'enter name', required: true }, 
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal',
    },
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    },
    {
      data: { type: 'password', name: 'confirm password', label: 'confirm password', placeholder: 'reenter password', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    }
  ]

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3]} },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ]

  const form = {
    data: { name: 'signupForm', submit: 'signup', cb: signup },
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
      id="signup-box-module" 
      fontSizeModule={[4]}
      width={[2]}
      height={['65vh']}
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
        onSubmit={signup}
        form={form}
        inputs={inputs}
        validate={validate}
        buttons={buttons}
      />
    </BoxAll>
  );
}

// export default graphql(query)(
//   graphql(mutation)(Signup)
// );

export default Signup;