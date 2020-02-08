import React, { Fragment } from 'react';
import { FlexDiv, P } from '@cbryant24/styled-react';
import { useQuery } from '@apollo/react-hooks';
import query from '../queries/Scores';

import { DAILY_TRIVIA } from '../localState/Queries';

import { useAuth } from '../hooks';

function TopMenu(props) {
  const { data }          = useQuery(DAILY_TRIVIA);
  const { loading: scoresLoading, data: playerScores } = useQuery(query);
  const { user, signout } = useAuth();

  return (
    <FlexDiv
      fontSizeModule={[2, 3]}
      width={[1]}
      justifyContent="space-between"
    >
      <FlexDiv
          flexDirection="column"
          alignItems="center"
          width={[3]}
          textAlign="center"
        >
          <P color="red">Trivia Topic</P>
          <P>{ data ? data.localTrivia.category : ''}</P>
      </FlexDiv>
      <FlexDiv
          themeStyle={['flexColumnCenter']}
          width={[3]}
        >
          <P color="red">HI-Score</P>
          <P>{
            scoresLoading || !playerScores ? '' : 
            !scoresLoading && !playerScores.length ? 0 : playerScores[0].score
            }
          </P>
      </FlexDiv>
      <FlexDiv
        flexDirection="column"
        alignItems="center"
        width={[3]}
      >
        {user ? 
          <Fragment>
            <P color="red" onClick={signout}>Logout</P> 
            <P>{user.name}</P>
          </Fragment>
        : '' }
      </FlexDiv>
    </FlexDiv>
  )
}

export default TopMenu;