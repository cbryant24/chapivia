// Top level App component
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import graphqlUser from 'queries/CurrentUser';
import graphqlLogin from 'mutations/Login';
import graphqlRegister from 'mutations/Register';
import graphqlLogout from 'mutations/Logout';

// see usage below
// hook from https://usehooks.com/useAuth/

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [user, setUser] = useState(null);
	const { loading: userLoading, data: userData, refetch } = useQuery(
		graphqlUser
	);
	const [userLogin] = useMutation(graphqlLogin);
	const [userSignout] = useMutation(graphqlLogout);
	const [userRegister] = useMutation(graphqlRegister);

	// Wrap any Firebase methods we want to use making sure ...
	// ... to save the user to state.

	const login = ({ email, password }) => {
		return userLogin({
			variables: { email, password },
		})
			.then(async (data) => {
				await refetch();
			})
			.catch((err) => {
				throw err;
			});
	};

	const register = ({ email, password, name }) => {
		return userRegister({
			variables: { email, password, name },
		})
			.then(async (data) => {
				await refetch();
			})
			.catch((err) => {
				throw err;
			});
	};

	const signout = () => {
		userSignout()
			.then(async (data) => {
				await refetch();
			})
			.catch((err) => {
				throw err;
			});
	};

	const sendPasswordResetEmail = (email) => {
		// return firebase
		//   .auth()
		//   .sendPasswordResetEmail(email)
		//   .then(() => {
		//     return true;
		//   });
	};

	const confirmPasswordReset = (code, password) => {
		// return firebase
		//   .auth()
		//   .confirmPasswordReset(code, password)
		//   .then(() => {
		//     return true;
		//   });
	};

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => {
		if (userLoading) return;
		const { user } = userData;

		if (user) {
			setUser(user);
		} else {
			setUser(false);
		}
	}, [userData]);

	// Return the user object and auth methods
	return {
		user,
		userLoading,
		login,
		register,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
	};
}

////////////////////////////////////
//////          USAGE         //////
////////////////////////////////////

// function App(props) {
//   return (
//     <ProvideAuth>
//       {/*
//         Route components here, depending on how your app is structured.
//         If using Next.js this would be /pages/_app.js
//       */}
//     </ProvideAuth>
//   );
// }

// Any component that wants auth state
// import React from "react";
// import { useAuth } from "./use-auth.js";

// function Navbar(props) {
//   // Get auth state and re-render anytime it changes
//   const auth = useAuth();

//   return (
//     <NavbarContainer>
//       <Logo />
//       <Menu>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//         {auth.user ? (
//           <Fragment>
//             <Link to="/account">Account ({auth.user.email})</Link>
//             <Button onClick={() => auth.signout()}>Signout</Button>
//           </Fragment>
//         ) : (
//           <Link to="/login">Signin</Link>
//         )}
//       </Menu>
//     </NavbarContainer>
//   );
// }
