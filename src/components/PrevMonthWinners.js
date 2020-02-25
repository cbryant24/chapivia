import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import converter from 'number-to-words';
import moment from 'moment';

import Marquee from './Marquee';

import prevMonthWinnersQuery from '../queries/PrevMonthWinners';
import { Div, H4, FlexUl, FlexLi, P } from '@cbryant24/styled-react';

import {
  FlexItem3x4,
  FlexItem3x4MbHide,
  LeftAlignText
} from './styledComponents';

function PrevMonthWinners(props) {
  const { loading, data: { prevMonthWinners } = {} } = useQuery(
    prevMonthWinnersQuery
  );

  if (loading) return <div>Loading</div>;

  function displayWinnersList() {
    let winnerPlace = 1;
    return prevMonthWinners.map((winner, idx) => {
      if (idx > 0) {
        winnerPlace =
          prevMonthWinners[idx].score === prevMonthWinners[idx - 1]
            ? winnerPlace
            : winnerPlace + 1;
      }
      return (
        <FlexLi
          justifyContent="space-between"
          textAlign="center"
          width={[1]}
          my={[2]}
          key={winner.name}
        >
          <Div display={['10%']}>
            <LeftAlignText>{`${winnerPlace}.`}</LeftAlignText>
          </Div>
          <FlexItem3x4>
            <LeftAlignText>{`${winner.score}0,000`}</LeftAlignText>
          </FlexItem3x4>
          <FlexItem3x4MbHide>
            <LeftAlignText>Main</LeftAlignText>
          </FlexItem3x4MbHide>
          <FlexItem3x4>
            <LeftAlignText wordBreak="break-word">{winner.name}</LeftAlignText>
          </FlexItem3x4>
        </FlexLi>
      );
    });
  }

  return (
    <Div display="flex" flexDirection="column" fontSizeModule={[1, null, 2]}>
      <H4 textAlign="center" my={[1]} color="primary">
        {`${moment()
          .subtract(1, 'month')
          .format('MMMM')} Winners!`}
      </H4>
      <FlexUl flexDirection="column">{displayWinnersList()}</FlexUl>
    </Div>
  );
}

export default PrevMonthWinners;
