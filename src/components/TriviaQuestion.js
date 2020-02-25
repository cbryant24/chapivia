import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';

import { DAILY_TRIVIA } from '../localState/Queries';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import { useAuth } from '../hooks';
import { guessFormData } from './formData';
import { guessValidation } from './validations';

import GuessForm from './GuessForm';
import { Div, Ul, P, Li } from '@cbryant24/styled-react';
import { Footnote } from './styledComponents';

//TODO: Bug where passing user obj causing error when validating data as string or number?
const TriviaQuestion = props => {
  const { data } = useQuery(DAILY_TRIVIA);
  const {
    loading: unguessedPlayersLoading,
    data: unguessedPlayersData
  } = useQuery(UnguessedPlayers);
  const { user } = useAuth();
  const { form, inputs, buttons } = guessFormData;

  function displayTriviaChoices() {
    return data.localTrivia.questionChoices.map((choice, idx) => {
      return (
        <Li pb="1rem" hover="cursor" key={choice}>
          {String.fromCharCode(65 + idx)}: {convertHTMLChar(choice)}
        </Li>
      );
    });
  }

  function convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  if (unguessedPlayersLoading) return <div></div>;

  if (user.role === 'admin') {
    inputs.forEach(input =>
      input.data.type === 'select'
        ? (input.data.inputData.options =
            unguessedPlayersData.nonGuessedPlayers)
        : ''
    );
  } else if (
    unguessedPlayersData.nonGuessedPlayers.some(
      nonGuessedPlayer => nonGuessedPlayer.id === user.id
    )
  ) {
    inputs.forEach(input =>
      input.data.type === 'select'
        ? (input.data.inputData.options = [{ id: user.id, name: user.name }])
        : ''
    );
  } else {
    return (
      <Div>
        <P textAlign="center">Trivia Question</P>
        <P p="0 0 2rem 0">{convertHTMLChar(data.localTrivia.question)}</P>
        <Ul>{displayTriviaChoices()}</Ul>
        <Footnote>
          you have already guessed! contact admin to ahange your answer.
        </Footnote>
      </Div>
    );
  }

  return (
    <Div
      id="trivia-question"
      gridRow={props.gridRow}
      gridColumn={props.gridColumn}
      flexDirection="column"
      fontSizeModule={[2]}
    >
      <P fontSize={[3]} textAlign="center" themeStyle={['marginBottomMedium']}>
        Trivia Question
      </P>
      <P p="0 0 2rem 0">{convertHTMLChar(data.localTrivia.question)}</P>
      <Ul>{displayTriviaChoices()}</Ul>
      <Div zIndex={[2]} fontSizeModule={[1]} width={[1]}>
        <GuessForm
          form={form}
          inputs={inputs}
          buttons={buttons}
          validate={guessValidation}
        />
      </Div>
    </Div>
  );
};

export default TriviaQuestion;
