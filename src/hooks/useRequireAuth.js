// Hook (use-require-auth.js)
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import useRouter from 'hooks/useRouter';

function useRequireAuth(redirectUrl = '/') {
	const auth = useAuth();
	const router = useRouter();

	// If auth.user is false that means we're not
	// logged in and should redirect.
	useEffect(() => {
		if (auth.user === false) {
			router.push(redirectUrl);
		}
	}, [auth, router]);

	return auth;
}

export default useRequireAuth;

////////////////////////////////////
//////          USAGE         //////
////////////////////////////////////

// import Dashboard from "./Dashboard.js";
// import Loading from "./Loading.js";
// import { useRequireAuth } from "./use-require-auth.js";

// function DashboardPage(props) {
//   const auth = useRequireAuth();

//   // If auth is null (still fetching data)
//   // or false (logged out, above hook will redirect)
//   // then show loading indicator.
//   if (!auth) {
//     return <Loading />;
//   }

//   return (
//     <Dashboard auth={auth} />
//   );
// }
