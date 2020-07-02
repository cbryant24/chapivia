import React from 'react';
import { FlexDiv } from '@cbryant24/styled-react';
import Background from 'components/Background';
import TopMenu from 'components/TopMenu';
// import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

// eslint-disable-next-line react/display-name
export default ({ children }) => {
	console.log('IM IN THE APP');

	return (
		<FlexDiv minHeight="100vh" flexDirection="column" alignItems="center">
			<Background />
			<TopMenu />
			{children}
		</FlexDiv>
	);
};
