
import graphqlUser from 'queries/CurrentUser';
import graphqlLogin from 'mutations/Login';
import graphqlSignup from 'mutations/Signup';
import graphqlLogout from 'mutations/Logout';
import graphqlScores from "queries/Scores";
import { DAILY_TRIVIA } from "localState/Queries";

const user = {
  id: 0,
  name: "Kanye",
  email: "kanye@west.com",
  role: 'player',
  score: 5
};

const trivia = {
  questionId: 0,
  question: "Which city did Anger berate for ruining pizza in &quot;Inside Out&quot;?",
  questionChoices: [
    "Minnesota",
    "Washington",
    "California",
    "San Francisco"
  ],
  questionChoicesId: 0,
  category: 'Entertainment: Cartoon & Animations',
};

export const SIGNUP_MOCK = [
  {
    request: {
      query: graphqlSignup,
      variables: {
        // id: user.id,
        email: user.email, 
        password: user.password, 
        name: user.name
      }
    },
    result: { data: { signup: { id: user.id, name: user.name, email: user.email }}}
  },
  {
    request: {
      query: graphqlUser,
    },
    result: { data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }}}
  }
];

// export const LOGOUT_MOCK = [
//   {
//     request: {
//       query: graphqlLogout
//     },
//     result: { data: { user: null }}
//   }
// ];

export const CURRENT_USER_MOCK = [
  {
    request: {
      query: graphqlUser
    },
    result: { data: { user: {id: 0, name: user.name, email: user.email, role: user.role }}}
  }
];

export const LOGIN_MOCK = [
  {
    request: {
      query: graphqlLogin
    },
    result: { data: { user: {id: 0, name: user.name, email: user.email, role: user.role }}}
  }
];

export const TOP_MENU_MOCKS_LOGGED_OUT = [
  {
    request: {
      query: graphqlUser
    },
    result: { data: {user: null }}
  },
  {
    request: {
      query: graphqlScores
    },
    result: { data: {scores: [{id: 0, name: user.name, score: user.score }]} }
  },
  {
    request: {
      query: DAILY_TRIVIA
    },
    result: { data: null }
  }
];

export const TOP_MENU_MOCKS_LOGGED_IN = [
  {
    request: {
      query: graphqlUser
    },
    result: { data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }}}
  },
  {
    request: {
      query: graphqlScores
    },
    result: { data: { scores: [{id: 0, name: user.name, score: 5}]} }
  },
  {
    request: { query: DAILY_TRIVIA },
    result: { data: { localTrivia: { ...trivia }}}
  },
  {
    request: {
      query: graphqlLogout
    },
    result: { data: { logout: null }}
  },
  {
    request: {
      query: graphqlUser
    },
    result: { data: { user: null }}
  }

];