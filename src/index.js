import React from "react";
import ReactDOM from "react-dom";
// import { Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Signin from "components/Signin";
import Signup from "components/Signup";
import Game from "components/Game";
import App from "components/App";
import Root from "Root";

import typeDefs from "localState/typeDefs";

import { LastLocationProvider } from "react-router-last-location";
import { BrowserRouter as Router, Route } from "react-router-dom";


const client = new ApolloClient({
  clientState: {
    defaults: {
      localTrivia: {
        questionId: null,
        question: "",
        questionChoices: [],
        questionChoicesId: null,
        __typename: "dailyTrivia"
      }
    },
    resolvers: {},
    typeDefs
  },
  uri: "/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
            <Router>
          <LastLocationProvider>
    <Root>
      <App>
        <Route path="/game" exact component={Game} />
        <Route path="/" exact component={Signin} />
        <Route path="/signup" component={Signup} />
      </App>
    </Root>
    </LastLocationProvider>
        </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

//TODO: [LAST BEFORE LAUNCH] FORM FOR SUBMITTING OWN TRIVIA WITH ANSWER SOURCE AND REPORT IF WRONG
//TODO: [LAST BEFORE LAUNCH] USER PROFILE AREA WITH CALENDAR VIEW OF CORRECT AND INCORRECT GUESSES
//TODO: [LAST BEFORE LAUNCH] USER AREA GRAPH BY CATEGORY OF CORRECT AND INCORRECT ANSWERS
//TODO: [LAST BEFORE LAUNCH] USER RANKINGS INCORRECT vs. CORRECT TITLE
//TODO: [LAST BEFORE LAUNCH] CUSTOM GAME GROUPS WITH CHAT
//TODO: [LAST BEFORE LAUNCH] EMAIL FOR CONFIRMING EMAIL, SIGNING UP, AND RESETTING PASSWORD