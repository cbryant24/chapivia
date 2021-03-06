import React from 'react';
import { FlexDiv } from '@cbryant24/styled-react';
import Background from 'components/Background';
import TopMenu from 'components/TopMenu';
import Modal from 'components/Modal';
// import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

// eslint-disable-next-line react/display-name
export default ({ children }) => {
	return (
		<FlexDiv minHeight="100vh" flexDirection="column" alignItems="center">
			<Background />
			<TopMenu />
			<Modal />
			{children}
		</FlexDiv>
	);
};
