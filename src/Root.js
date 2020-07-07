import React from 'react';
import { GlobalStyle } from 'style';
import { ThemeProvider, ModalProvider } from '@cbryant24/styled-react';
import { Provider } from 'react-redux';
import theme from 'style/theme';

import configureStore from 'configureStore';
import { ProvideAuth } from 'hooks';

const store = configureStore();

export default ({ children }) => {
	return (
		<Provider store={store}>
			<ProvideAuth>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<ModalProvider>{children}</ModalProvider>
				</ThemeProvider>
			</ProvideAuth>
		</Provider>
	);
};
