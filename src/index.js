import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signin from "components/Signin";
import Signup from "components/Signup";
import Game from "components/Game";
import App from "components/App";
import Root from "Root";

//TODO: [LAST BEFORE LAUNCH] FORM FOR SUBMITTING OWN TRIVIA WITH ANSWER SOURCE AND REPORT IF WRONG
//TODO: [LAST BEFORE LAUNCH] USER PROFILE AREA WITH CALENDAR VIEW OF CORRECT AND INCORRECT GUESSES
//TODO: [LAST BEFORE LAUNCH] USER AREA GRAPH BY CATEGORY OF CORRECT AND INCORRECT ANSWERS
//TODO: [LAST BEFORE LAUNCH] USER RANKINGS INCORRECT vs. CORRECT TITLE
//TODO: [LAST BEFORE LAUNCH] CUSTOM GAME GROUPS WITH CHAT
//TODO: [LAST BEFORE LAUNCH] EMAIL FOR CONFIRMING EMAIL, SIGNING UP, AND RESETTING PASSWORD

ReactDOM.render(
  <Root>
    <App>
      <Route path="/game" exact component={Game} />
      <Route path="/" exact component={Signin} />
      <Route path="/signup" component={Signup} />
    </App>
  </Root>,
  document.getElementById("root")
);
