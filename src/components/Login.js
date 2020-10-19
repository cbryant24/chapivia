import React, { useState, useEffect, useCallback } from 'react';

import Form from '@cbryant24/styled-react-form';
import { loginValidation } from 'components/validations';
import { Div, H1, H3, P } from '@cbryant24/styled-react';
import { loginFormData } from 'components/formData';
import { useSelector, useDispatch } from 'react-redux';
import types from 'actions/types';
import { flashingText } from 'style';

import Modal from './Modal';

import { useAuth, useEventListener, useRouter } from '../hooks';

//TODO: Errors message applicable to correct field only
function Login(props) {
	const [isOpen, setIsOpen] = useState(false),
		{ form, inputs, buttons } = loginFormData,
		[signinOpen, setSigninOpen] = useState(false),
		{ login, user, userLoading } = useAuth(),
		router = useRouter(),
		dispatch = useDispatch();

	const { modal } = useSelector((state) => state);

	async function userLogin(event, formVals) {
		event.preventDefault();

		try {
			await login(formVals);
			redirectUser();
		} catch (res) {
			const errors =
				res.graphQLErrors && res.graphQLErrors.length
					? res.graphQLErrors
					: 'There was an error registering please try again';
			// toggleModal();
			// setModalMessage(errors);
			dispatch({
				type: 'OPEN_MODAL',
				payload: {
					message:
						'There was an error logging in if error continues please try again later',
				},
			});
			return;
		}
	}

	useEffect(() => {
		if (user) router.push('/game');
	}, [user]);

	const toggleModal = (e) => setIsOpen(!isOpen);

	const redirectUser = () => router.push('/game');

	const handler = useCallback(
		({ key }) => {
			if (key === 'Enter' || key === ' ') {
				setSigninOpen(true);
			}
		},
		[setSigninOpen]
	);

	const showLogin = () => {
		setSigninOpen(true);
	};

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
					isOpen={modal.isOpen}
					modalMessage={modal.message}
					closeModal={() => dispatch({ type: 'CLOSE_MODAL' })}
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
					onClick={() => showLogin()}
					color="primary"
					// animation={{
					// 	continuous: {
					// 		from: { opacity: '0' },
					// 		to: { opacity: '1' },
					// 	},
					// 	duration_continuous: 1,
					// 	animation_direction: 'alternate-reverse',
					// }}
					animation={flashingText}
				>
					Press Start To Play
				</H3>
				<Div
					id="login-form-container"
					display={signinOpen ? 'block' : 'none'}
					width={[1]}
				>
					<Form
						onSubmit={userLogin}
						form={form}
						inputs={inputs}
						validate={loginValidation}
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

export default Login;
