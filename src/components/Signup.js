import React, { useState, useEffect } from "react";
import Form from "@cbryant24/styled-react-form";
import { signupValidation } from "components/validations";
import { signupFormData } from "components/formData";

import { Div, H1, P } from "@cbryant24/styled-react";
import Modal from "components/Modal";
import { useAuth, useRouter } from "hooks";

//TODO: Errors message applicable to correct field only

function Signup(props) {
  const [isOpen, setIsOpen] = useState(false),
    { form, inputs, buttons } = signupFormData,
    [modalMessage, setModalMessage] = useState(""),
    { signup, user, userLoading } = useAuth(),
    router = useRouter();

  async function userSignup(event, formVals) {
    event.preventDefault();
    try {
      await signup(formVals);

      redirectUser();
    } catch (res) {
      toggleModal();
      setModalMessage(res.graphQLErrors);
      return;
    }
  }

  useEffect(() => {
    if (user) {
      toggleModal();
      setModalMessage(`${user.name} is already logged in you'll be redirected to Chapivia`);
    }
  }, [user]);

  const toggleModal = e => setIsOpen(!isOpen);

  const redirectUser = () => router.push('/game');

  if (userLoading || user) return (
    <Modal
      isOpen={isOpen}
      modalMessage={modalMessage}
      toggleModal={toggleModal}
      afterClose={redirectUser}
    />
  );

  return (
    <Div fontSizeModule={[1, null, 2, null, 3]} margin="auto">
      <Div
        id="signupboxmodule"
        width={['50em']}
        themeStyle={["flexCenterSpaceEvenlyColumn", "marginTopLarge"]}
      >
        <Modal
          isOpen={isOpen}
          modalMessage={modalMessage}
          toggleModal={toggleModal}
        />
        <H1 color="secondary">CHAPIVIA</H1>
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
