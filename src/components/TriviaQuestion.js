import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { AllHtmlEntities as Entities } from "html-entities";

import { DAILY_TRIVIA } from "localState/Queries";
import UnguessedPlayers from "queries/UnguessedPlayers";
import { useAuth } from "hooks";
import { guessFormData } from "components/formData";
import { guessValidation } from "components/validations";

import GuessForm from "components/GuessForm";
import { Div, Ul, P, Li } from "@cbryant24/styled-react";
import { Footnote } from "components/styledComponents";

//TODO: Bug where passing user obj causing error when validating data as string or number?
const TriviaQuestion = props => {
  const { data } = useQuery(DAILY_TRIVIA);
  const {
    loading: unguessedPlayersLoading,
    data: unguessedPlayersData,
    refetch: refetchUnguessedPlayersData
  } = useQuery(UnguessedPlayers);
  const { user } = useAuth();
  const { form, inputs, buttons } = guessFormData;

  if (!user) return <div></div>;
  
  useEffect(() => {
    refetchUnguessedPlayersData();
  }, []);

  function updateGuessFormChoices() {
    refetchUnguessedPlayersData();
  }

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
  debugger;
  // IF CURRENT USER IS ADMIN ADD ALL PLAYERS TO GUESS FORM
  if (user.role === "admin") {
    inputs.forEach(input => {
      if (input.data.type === "select") {
        input.data.inputData.options = unguessedPlayersData.nonGuessedPlayers;
        input.data.inputData.options.unshift({ id: "", name: "" });
      }
    });
  } else if (
    unguessedPlayersData.nonGuessedPlayers.some(
      nonGuessedPlayer => nonGuessedPlayer.id === user.id
    )
  ) {
    inputs.forEach(input =>
      input.data.type === "select"
        ? (input.data.inputData.options = [{ id: user.id, name: user.name }])
        : ""
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
      <P fontSize={[3]} textAlign="center" themeStyle={["marginBottomMedium"]}>
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
          guessType={user.role === "admin" ? "adminGuess" : "newGuess"}
          afterModalClose={updateGuessFormChoices}
        />
      </Div>
    </Div>
  );
};

export default TriviaQuestion;
