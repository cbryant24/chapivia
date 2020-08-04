import React, { useState, useEffect } from 'react';
import Form from '@cbryant24/styled-react-form';
import { registerValidation } from 'components/validations';
import { registerFormData } from 'components/formData';
import { useSelector, useDispatch } from 'react-redux';
import { Div, H1, P } from '@cbryant24/styled-react';
import Modal from 'components/Modal';
import { useAuth, useRouter } from 'hooks';

//TODO: Errors message applicable to correct field only

function Register(props) {
	const [isOpen, setIsOpen] = useState(false),
		{ form, inputs, buttons } = registerFormData,
		dispatch = useDispatch(),
		{ register, user, userLoading } = useAuth(),
		router = useRouter();

	async function registration(event, formVals) {
		event.preventDefault();
		try {
			await register(formVals);

			redirectUser();
		} catch (res) {
			// const errors =
			// 	res.graphQLErrors && res.graphQLErrors.length
			// 		? res.graphQLErrors
			// 		: 'There was an error registering please try again';
			// toggleModal();
			// setModalMessage(errors);

			dispatch({
				type: 'OPEN_MODAL',
				payload: {
					message: 'There was an error registering if error continues please try again later',
				}
			});

			return;
		}
	}

	useEffect(() => {
		if (user) {
			dispatch({
				type: 'OPEN_MODAL',
				payload: {
					afterClose: redirectUser,
					message: `${user.name} is already logged in you'll be redirected to main game`
				}
			});
		}
	}, [user]);

	const redirectUser = () => router.push('/game');

	if (userLoading || user)
		return <div></div>;

	return (
		<Div fontSizeModule={[1, null, 2, null, 3]} margin="auto">
			<Div
				width={['50em']}
				themeStyle={['flexCenterSpaceEvenlyColumn', 'marginTopLarge']}
			>
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
