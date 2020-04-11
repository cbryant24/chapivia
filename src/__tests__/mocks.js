
import graphqlUser from 'queries/CurrentUser';
import graphqlLogin from 'mutations/Login';
import graphqlSignup from 'mutations/Signup';
import graphqlLogout from 'mutations/Logout';

export const user = {
  id: 0,
  name: "Kanye",
  email: "kanye@west.com",
  role: 'player'
};

export const SIGNUP_MOCK = [
  {
    request: {
      query: graphqlSignup,
      variables: {
        id: user.id,
        email: user.email, 
        password: user.password, 
        name: user.name
      }
    },
    result: { data: { user: {id: user.id, name: user.name, email: user.email, role: user.role }}}
  }
];

export const LOGOUT_MOCK = [
  {
    request: {
      query: graphqlLogout
    },
    result: { data: { user: null }}
  }
];

export const CURRENT_USER_MOCK = [
  {
    request: {
      query: graphqlUser
    },
    result: { data: {user: {id: 0, name: "Kanye", email: "kanye@west.com", role: 'player' }}}
  }
];

export const LOGIN_MOCK = [
  {
    request: {
      query: graphqlLogin
    },
    result: { data: {user: {id: 0, name: "Kanye", email: "kanye@west.com", role: 'player' }}}
  }
];