import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PrevMonthWinners from './PrevMonthWinners';

import query from '../queries/Scores';

import { Box, BoxAll, Flex, Text, Div, FlexUl, FlexLi, Li, P } from '@cbryant24/styled-react';

const Scoreboard = props => {
  const { loading, data } = useQuery(query);

  function displayPlayerScores() {
    let place = 1;

    return (
      data.scores ? data.scores.map( (player, idx) => {
        if (idx > 0) {
          place = data.scores[idx].score === data.scores[idx - 1] ? place : idx;
        }
        return ( 
          <FlexLi
            isA="h3"
            justifyContent="space-around"
            textAlign="center"
            width={[1]}
            my={[2]}
          >
            <P width={[5]}>{place}.</P>
            <P width={[5]}>{player.score}0,000</P>
            <P width={[5]}>T-B-D</P>
            <P width={[5]}>{player.name}</P>
          </ FlexLi>
        );

      }) : <Flex></Flex>
    );
  }

  if (loading) return <Box></Box>;

  return (
    <BoxAll
      display="flex"
      flexDirection="column"
      fontSizeModule={[1]}
    >
    <FlexUl
        justifyContent="space-around"
        fontSize={[3]}
        textAlign="center"
      >
        <Li width={[5]}>
          <P>Rank</P>
        </Li>
        <Li width={[5]}>
          <P>Score</P>
        </Li>
        <Li width={[5]}>
          <P>Stage</P>
        </Li>
        <Li width={[5]}>
          <P>Name</P>
        </Li>
      </FlexUl>
      <PrevMonthWinners/>
      {displayPlayerScores()}
    </ BoxAll>
  );
  
}

export default Scoreboard;
