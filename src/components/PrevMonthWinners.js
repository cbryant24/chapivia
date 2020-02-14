import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import converter from 'number-to-words';
import moment from 'moment';

import Marquee from './Marquee';

import prevMonthWinnersQuery from '../queries/PrevMonthWinners';
import { BoxAll, TextAll, Div, H4, FlexUl, FlexLi, Li, P } from '@cbryant24/styled-react';
import { theme } from './style';

function PrevMonthWinners(props) {
  const {loading, data: { prevMonthWinners } = {} } = useQuery(prevMonthWinnersQuery);
  // console.log(data)
  // return <div>Hello World</div>

  if (loading) return <div>Loading</div>;
  
  function createMarqueeItems() {
    
  }

  function displayWinnersList() {
    let winnerPlace = 1;
    return prevMonthWinners.map( (winner, idx) => {
      if (idx > 0) {
        winnerPlace = prevMonthWinners[idx].score === prevMonthWinners[idx - 1] ? winnerPlace : winnerPlace + 1;
      }
      return (
        <FlexLi
          isA="h3"
          justifyContent="space-around"
          textAlign="center"
          width={[1]}
          my={[2]}
        >
          <P width={[5]}>{winnerPlace}.</P> 
          <P width={[5]}>{winner.score}0,000</P>
          <P width={[5]}>T-B-D</P>
          <P width={[5]}>{winner.name}</P>
        </FlexLi>
      )
    })
  }

  return (
    <Div
      display="flex"
      flexDirection="column"
      fontSizeModule={[1, null, 2]}
    >
      <H4
        textAlign="center"
        my={[4]}
      >
        - {`${moment().subtract(1, 'month').format('MMMM')} winners`} -
      </H4>
      <FlexUl
        flexDirection="column"
      >
        {displayWinnersList()}
      </FlexUl>
    </Div>

  )
}

export default PrevMonthWinners;