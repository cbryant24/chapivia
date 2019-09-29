import React from 'react';
import { useQuery } from '@apollo/react-hooks';


import query from '../queries/Scores';

import { Box, Flex, Text } from './element';

const Scoreboard = props => {
  const { loading, data } = useQuery(query);

  function displayPlayerScores() {

    return (
      data.scores.map( player => (
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          justifyContent="space-between"
          height="4rem"
          key={player.id}
        >
          <Text
            textTransform="uppercase"
            fontSize="1.7rem"
            fontWeight="500"
            padding-left="2rem"
          >
            {player.name}
          </Text>
            <Text 
              fontSize="1.7rem"
              fontWeight="500"
            >
              {player.score}
            </Text>
        </Flex>
      ))
    )
  }

  if (loading) return <Box></Box>;

  return (
    < Flex 
      flexDirection="column"
      fontSizeModule={[1]}
    >
      <Text
        isA="h2"
        textAlign="center"
        h2FontSize={[1]}
      >
        Player Scores
      </Text>
      {displayPlayerScores()}
    </ Flex>
  );
  
}

export default Scoreboard;
