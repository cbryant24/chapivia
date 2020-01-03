import React from 'react';
import { useQuery } from '@apollo/react-hooks';


import query from '../queries/Scores';

import { Box, BoxAll, Flex, Text } from './element';

const Scoreboard = props => {
  const { loading, data } = useQuery(query);

  function displayPlayerScores() {

    return (
      data.scores ? data.scores.map( player => (
        <BoxAll
          display="flex"
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
        </BoxAll> 
      )) : <Flex></Flex>
    );
  }

  if (loading) return <Box></Box>;

  return (
    <BoxAll
      display="flex"
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
    </ BoxAll>
  );
  
}

export default Scoreboard;
