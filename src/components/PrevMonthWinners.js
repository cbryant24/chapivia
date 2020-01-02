import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import converter from 'number-to-words';
import moment from 'moment';

import Marquee from './Marquee';

import prevMonthWinnersQuery from '../queries/PrevMonthWinners';
import { BoxAll, TextAll } from './element';
import { theme } from './style';

function PrevMonthWinners(props) {
  const {loading, data: { prevMonthWinners } = {} } = useQuery(prevMonthWinnersQuery);
  // console.log(data)
  // return <div>Hello World</div>

  if (loading) return <div>Loading</div>;
  
  function createMarqueeItems() {
    let winnerPlace = 1;
    return prevMonthWinners.map( (winner, idx) => {
      if (idx > 0) {
        winnerPlace = prevMonthWinners[idx].score === prevMonthWinners[idx - 1] ? winnerPlace : winnerPlace + 1;
      }
      return (
        <BoxAll
          isA="h3"
          fontSize="2rem"
          textAlign="center"
          width={[3]}
        >
          <BoxAll>{`${converter.toOrdinal(winnerPlace)} Place: ${winner.name}`}</BoxAll> 
          <BoxAll>{`Score: ${winner.score}`}</BoxAll>
        </BoxAll>
      )
    })
  }

  return (
    <BoxAll
      display="flex"
      flexDirection="column"
    >
      <BoxAll
        isA="h3"
        textAlign="center"
      >
        {`Congrats To ${moment().subtract(1, 'month').format('MMMM')} winners`}
      </BoxAll>
      <Marquee
        theme={theme}
        height="6rem"
        width={[1]}
      >
        { createMarqueeItems() }
      </Marquee>
    </BoxAll>

  )


  // debugger
  return <div>Im the previous winner</div>
}

export default PrevMonthWinners;