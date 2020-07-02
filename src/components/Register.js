import React, { useState, useEffect } from 'react';
import Form from '@cbryant24/styled-react-form';
import { registerValidation } from 'components/validations';
import { registerFormData } from 'components/formData';

import { Div, H1, P } from '@cbryant24/styled-react';
import Modal from 'components/Modal';
import { useAuth, useRouter } from 'hooks';

//TODO: Errors message applicable to correct field only

function Register(props) {
	const [isOpen, setIsOpen] = useState(false),
		{ form, inputs, buttons } = registerFormData,
		[modalMessage, setModalMessage] = useState(''),
		{ register, user, userLoading } = useAuth(),
		router = useRouter();

	async function registration(event, formVals) {
		event.preventDefault();
		try {
			await register(formVals);

			redirectUser();
		} catch (res) {
			const errors =
				res.graphQLErrors && res.graphQLErrors.length
					? res.graphQLErrors
					: 'There was an error registering please try again';
			toggleModal();
			setModalMessage(errors);

			return;
		}
	}

	useEffect(() => {
		if (user) {
			toggleModal();
			setModalMessage(
				`${user.name} is already logged in you'll be redirected to Chapivia`
			);
		}
	}, [user]);

	const toggleModal = (e) => setIsOpen(!isOpen);

	const redirectUser = () => router.push('/game');

	if (userLoading || user)
		return (
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
				width={['50em']}
				themeStyle={['flexCenterSpaceEvenlyColumn', 'marginTopLarge']}
			>
				<Modal
					isOpen={isOpen}
					modalMessage={modalMessage}
					toggleModal={toggleModal}
				/>
				<H1 color="secondary">CHAPIVIA</H1>
				<Form
					onSubmit={registration}
					form={form}
					inputs={inputs}
					validate={registerValidation}
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

export default Register;
