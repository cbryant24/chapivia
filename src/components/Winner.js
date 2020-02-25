import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaAnswer from '../queries/TriviaAnswer';

import { H4, Div, P, FlexDiv } from '@cbryant24/styled-react';

const Winner = props => {
  const { loading: triviaAnswerLoading, data: triviaAnswerData } = useQuery(
    TriviaAnswer
  );
  const { loading: correctGuessesLoading, data: correctGuessesData } = useQuery(
    CorrectGuessesQuery
  );

  function displayWinners() {
    return correctGuessesData.correctGuesses.map((guesser, idx) => (
      <P
        fontSize={[1]}
        color="primary"
        textTransform="uppercase"
        key={guesser.id}
      >
        {guesser.name}
      </P>
    ));
  }

  function convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  if (triviaAnswerLoading || correctGuessesLoading) return <div></div>;

  if (!triviaAnswerData.triviaSolution)
    return (
      <P textTransform="uppercase">
        Checkback after 5pm for the correct answer
      </P>
    );

  return (
    <Div
      display="flex"
      flexDirection="column"
      width="100%"
      fontSizeModule={[2]}
    >
      <P fontSize={[3]} textAlign="center">
        Yesterdays Trivia Answer & Winners
      </P>
      <Div textTransform="uppercase">
        <P width={[1]}>Yesterdays Trivia:</P>
        <P>
          {convertHTMLChar(triviaAnswerData.triviaSolution.question.question)}!
        </P>
      </Div>
      <FlexDiv textTransform="uppercase" color="primary">
        <P>Yesterdays Answer:</P>
        <P>{convertHTMLChar(triviaAnswerData.triviaSolution.correctChoice)}!</P>
      </FlexDiv>
      <P textTransform="uppercase">
        {new Date().getHours() >= 17
          ? 'Correct Guesses'
          : 'Yesterdays Correct Guesses'}
        :&nbsp;
      </P>
      {displayWinners()}
    </Div>
  );
};

export default Winner;
