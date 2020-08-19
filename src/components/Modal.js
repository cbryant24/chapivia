import React from 'react';
import { StyledModal, Div, Ul, Li, Button, P } from '@cbryant24/styled-react';
import { useSelector, useDispatch } from 'react-redux';
import types from 'actions/types';
// import { dropInFromTop } from './style';

const Modal = ({ isOpen, modalMessage, afterClose, beforeClose, afterOpen, beforeOpen }) => {
	const { modal } = useSelector((state) => state);
	const dispatch = useDispatch();
	const dropInFromTop = {
		in: {
			'0%': {
				transform: 'translateY(-1000px)',
				visibility: 'hidden',
				'animation-timing-function': 'ease-in',
				opacity: 0,
			},
			'38%': {
				transform: 'translateY(0)',
				visibility: 'visible',
				'animation-timing-function': 'ease-out',
				opacity: 1,
			},
			'55%': {
				transform: 'translateY(-65px)',
				'animation-timing-function': 'ease-in',
			},
			'72%': {
				transform: 'translateY(0)',
				'animation-timing-function': 'ease-out',
			},
			'81%': {
				transform: 'translateY(-28px)',
				'animation-timing-function': 'ease-in',
			},
			'90%': {
				transform: 'translateY(0)',
				'animation-timing-function': 'ease-out',
			},
			'95%': {
				transform: 'translateY(-8px)',
				'animation-timing-function': 'ease-in',
			},
			'100%': {
				transform: 'translateY(0)',
				'animation-timing-function': 'ease-out',
			},
		},
		duration_in: 1,
		animation_fill_mode: 'both',
	};

	const closeModal = () => dispatch({ type: types.CLOSE_MODAL });

	return (
		<StyledModal
			id="chapivia-modal"
			isOpen={modal.isOpen}
			onBackgroundClick={closeModal}
			onEscapeKeydown={closeModal}
			modalBackgroundStyle={{ themeStyle: 'modalBackgroundStyle' }}
			allowScroll={false}
			afterClose={modal.afterClose}
			beforeClose={modal.beforeClose}
			afterOpen={modal.afterOpen}
			beforeOpen={modal.beforeOpen}
		>
			<Div themeStyle={['modalContainer']} animation={dropInFromTop}>
				<Ul textAlign="center" my={[1]}>
					{Array.isArray(modal.message) ? (
						modal.message.map((message) => (
							<Li key={message}>{message.message}</Li>
						))
					) : (
						<Li>
							<P>{modal.message}</P>
						</Li>
					)}
				</Ul>
				<Button
					themeStyle={['squareButton', 'marginSmall']}
					alignSelf="flex-end"
					onClick={closeModal}
				>
					Close
				</Button>
			</Div>
		</StyledModal>
	);
};

export default Modal;
