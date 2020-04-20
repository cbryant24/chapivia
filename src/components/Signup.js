import React, { useState, useEffect } from "react";
import Form from "@cbryant24/styled-react-form";
import { Button } from '@cbryant24/styled-react';
import { signupValidation } from "components/validations";
import { signupFormData } from "components/formData";

import { Div, H1, P } from "@cbryant24/styled-react";
import Modal from "./Modal";
import { useAuth, useRouter } from "hooks";

//TODO: Errors message applicable to correct field only

function Signup(props) {
  const [isOpen, setIsOpen] = useState(false),
    { form, inputs, buttons } = signupFormData,
    [modalMessage, setModalMessage] = useState(""),
    { signup, user } = useAuth();
    // router = useRouter();
    let [heading, setHeading] = useState("CHAPIVIA");
    let [formSubmitted, setFormSubmitted] = useState(false);

  async function help(event, formVals) {
    event.preventDefault();
    // try {
    //   await signup(formVals);
    // } catch (res) {
    //   toggleModal();
    //   setModalMessage(res.graphQLErrors);
    //   return;
    // }
    // return router.push("/game");
    // console.log("AM I GETTING TO THIS POINT", event.hasOwnProperty('preventDefault'))
    // console.log("AM I GETTING TO THIS POINT", event)
    // console.log(formVals);
    // console.log(event);
    // setFormSubmitted(true);
    // doNothing();
    setHeading(prevState => `NEW ${prevState}`)
    console.log("IM THE HEADING AFTER SET IN HELP", heading);
    return;

    // try {
    //   console.log("IM BEFORE THE SIGNUP")
    //   // console.log(signup);
    //   await signup(formVals);
    //   console.log("IM AFTER THE SIGNUP");
    //   // setFormSubmitted(true)
    //   // console.log(val);
    //   console.log("IM AFTER THE HEADING")
    // } catch(err) {
    //   console.log("IS THIS HAPPENING", err)
    //   setHeading('NEW ERROR', err)
    // }
  }

  // useEffect(() => {
  //   console.log("IM NOT SETTING THE FORM SUBMITTED");
  //   if (!formSubmitted) return;

  //   console.log("IM SETTING THE FORM SUBMITTED");
  //   setHeading('NEW CHAPIVIA');
  //   console.log("I SUBMITTED THE HEADING");
  // }, [formSubmitted])

  // setTimeout(() => {
  //   setFormSubmitted(true);
  // }, 500)
  
  function doNothing(event) {
    // console.log(event);
    // event.preventDefault();
    console.log("IM THE ")
    setHeading( prevState => `NEW ${prevState}`);
    console.log("IM THE HEADING AFTER SET IN DO NOTHING", heading);

    return;
  }

  const toggleModal = e => setIsOpen(!isOpen);
  // console.log(toggleModal)
  console.log("IM THE HEADING IN THE COMPONENT", heading);
  return (
    <Div fontSizeModule={[1, null, 2, null, 3]}>
      <Div
        id="signupboxmodule"
        width={[1]}
        themeStyle={["flexCenterSpaceEvenlyColumn", "marginTopLarge"]}
      >
        <Modal
          isOpen={isOpen}
          modalMessage={modalMessage}
          toggleModal={toggleModal}
        />
        <H1 color="secondary">{heading}</H1>
        <Form
          // onSubmit={doNothing}
          onSubmit={help}
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
      <Button id="test-button" onClick={help}>Help</Button>
    </Div>
  );
}

export default Signup;
