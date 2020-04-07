import React, { Fragment } from "react";
import { Div, FlexDiv, P, createLink } from "@cbryant24/styled-react";
import { useQuery } from "@apollo/react-hooks";
import query from "../queries/Scores";
import { Link } from "react-router-dom";

import { DAILY_TRIVIA } from "../localState/Queries";

import { useAuth, useRouter } from "../hooks";

function TopMenu(props) {
  const { data } = useQuery(DAILY_TRIVIA);
  const { loading: scoresLoading, data: playerScores } = useQuery(query);
  const { user, signout } = useAuth();
  const StyledLink = createLink(Link);
  const { pathname } = useRouter();

  return (
    <Div width={[1]} fontSizeModule={[2, 3]}>
      <FlexDiv
        themeStyle="marginTopSmall"
        justifyContent="space-between"
        flexWrap={["wrap-reverse", "nowrap"]}
      >
        <FlexDiv
          flexDirection="column"
          alignItems="center"
          width={[1, 3]}
          textAlign="center"
        >
          <P color="red">Trivia Topic</P>
          <P>{data ? data.localTrivia.category : ""}</P>
        </FlexDiv>
        <FlexDiv themeStyle={["flexColumnCenter"]} width={[2, 3]}>
          <P color="red">HI-Score</P>
          <P>
            {scoresLoading || !playerScores
              ? ""
              : !scoresLoading && !playerScores.length
              ? 0
              : playerScores[0].score}
          </P>
        </FlexDiv>
        <FlexDiv flexDirection="column" alignItems="center" width={[2, 3]}>
          {user ? (
            <Fragment>
              <P color="red" cursor="pointer" onClick={signout}>
                Logout
              </P>
              <P>{user.name}</P>
            </Fragment>
          ) : (
            <StyledLink
              animation={{
                continuous: {
                  from: { color: "white" },
                  to: { color: "red" }
                },
                duration_continuous: 1,
                animation_direction: "alternate-reverse"
              }}
              themeStyle="linkNormal"
              to={pathname === "/signup" ? "/" : "/signup"}
            >
              {`Click Here To ${pathname === "/signup" ? "Login!" : "Signup!"}`}
            </StyledLink>
          )}
        </FlexDiv>
      </FlexDiv>
    </Div>
  );
}

export default TopMenu;
