import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import theme from './style/theme';

import { FlexItem, BoxAll, BounceAnimations, Text } from './element';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import FormApp from './Form/App';
import { validate } from './helpers/validators';
import Modal from './Modal';
import { usePrev, useAuth } from '../hooks';

//TODO: Errors message applicable to correct field only

function Signup(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // const [ userSignup ] = useMutation(mutation);
  const { loading: userLoading, data: userData, refetch, client } = useQuery(query);
  const prevUser = usePrev(userData);
  const { signup } = useAuth();
  
  async function userSignup(event, formVals) {
    try {
      // await userSignup({
      //   variables: { email, password, name}
      // });
      // await refetch();
      debugger
      signup(formVals);
      debugger
      return props.history.push('/game');

    } catch(res) {
      console.log(res)
      debugger
      toggleModal();
      setModalMessage('Error Signing Up');
    }
  }

  // useEffect( () => {
  //   console.log(userData);
  //   if (userLoading || !userData.user) return;
  //   debugger
  //   client.writeData({
  //     data: {
  //       player: {
  //         id: userData.user.id,
  //       name: userData.user.name,
  //       email: userData.user.email,
  //       role: userData.user.role,
  //       __typename: 'player'
  //       }
  //     }
  //   })
  //   debugger
  // }, [userData])

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
    data: { name: 'signupForm', submit: 'signup', cb: userSignup },
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
        onSubmit={userSignup}
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