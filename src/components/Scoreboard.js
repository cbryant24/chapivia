import React from "react";
import { useQuery } from "@apollo/react-hooks";
import PrevMonthWinners from "./PrevMonthWinners";
import moment from "moment";

import query from "../queries/Scores";

import { Div, FlexUl, Li, H4 } from "@cbryant24/styled-react";
import {
  FlexItem3x4,
  FlexItem3x4MbHide,
  LeftAlignText
} from "./styledComponents";

const Scoreboard = props => {
  const { loading, data } = useQuery(query);

  function displayPlayerScores() {
    let place = 1;

    if (!data) return;

    return data.scores ? (
      data.scores.map((player, idx) => {
        if (idx > 0) {
          place =
            data.scores[idx].score === data.scores[idx - 1].score ? place : idx;
        }
        return (
          <FlexUl
            justifyContent="space-between"
            textAlign="center"
            width={[1]}
            my={[2]}
            key={idx}
          >
            <Li width={["10%"]}>
              <LeftAlignText>{`${place}.`}</LeftAlignText>
            </Li>
            <FlexItem3x4 isA="li">
              <LeftAlignText>{`${player.score}0,000`}</LeftAlignText>
            </FlexItem3x4>
            <FlexItem3x4MbHide isA="li">
              <LeftAlignText>main</LeftAlignText>
            </FlexItem3x4MbHide>
            <FlexItem3x4 isA="li">
              <LeftAlignText>{player.name}</LeftAlignText>
            </FlexItem3x4>
          </FlexUl>
        );
      })
    ) : (
      <div></div>
    );
  }

  if (loading) return <div></div>;

  return (
    <Div display="flex" flexDirection="column" fontSizeModule={[1]}>
      <FlexUl
        justifyContent="space-between"
        fontSize={[1, 3]}
        textAlign="center"
      >
        <FlexItem3x4 isA="li">
          <LeftAlignText>Rank</LeftAlignText>
        </FlexItem3x4>
        <FlexItem3x4 isA="li">
          <LeftAlignText>Score</LeftAlignText>
        </FlexItem3x4>
        <FlexItem3x4MbHide isA="li">
          <LeftAlignText>Stage</LeftAlignText>
        </FlexItem3x4MbHide>
        <FlexItem3x4 isA="li">
          <LeftAlignText>Name</LeftAlignText>
        </FlexItem3x4>
      </FlexUl>
      <PrevMonthWinners />
      <H4 textAlign="center" my={[1]} color="tertiary">
        {`${moment().format("MMMM")} Scoreboard`}
      </H4>
      {displayPlayerScores()}
    </Div>
  );
};

export default Scoreboard;
