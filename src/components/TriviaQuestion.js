import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';

// import { graphql } from 'react-apollo';

import mutation from '../mutations/Guess';
// import query from '../queries/Trivia';
import { DAILY_TRIVIA } from '../localState/Queries';

import GuessForm from './GuessForm';
import { Box, Grid, GridItem, Text, List, Item, Heading } from './element';

const TriviaQuestion = (props) => {
  const val = useQuery(DAILY_TRIVIA);
  debugger
  function displayTriviaChoices() {
    return (
      data.dailyTrivia.triviaChoices.choices.map( (choice, idx) => {
        return(
          <Box
            isA="li"
            pb="1rem"
            hover
            key={choice}
          >
            {String.fromCharCode(65 + idx)}: { convertHTMLChar(choice) }
          </Box>
        )
      })
    );
  }

  function convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  if(loading) return <div></div>
  debugger
  return (
    <GridItem 
      gridRow={props.gridRow} 
      gridColumn={props.gridColumn}
      flexDirection="column"
      fontFamily="VT323"
      fontSmooth="none"
    >
      <Text
        p="0 0 2rem 0;"
        fontSize="2.1rem"
      >
        {convertHTMLChar(data.dailyTrivia.question) || ""}
      </Text>
      <Box
        isA="ul"
      >
        {displayTriviaChoices()}
      </Box>
      <GuessForm
        trivia={data.dailyTrivia}
      />
    </GridItem>
  );
}

export default TriviaQuestion;

// class TriviaQuestion extends Component {

//   displayGuesses() {
//     const { choices } = this.props.data.trivia.questionChoice;

//     return (
//       choices.map( (choice, idx) => {
//         return(
//           <Box
//             isA="li"
//             pb="1rem"
//             hover
//             key={choice}
//           >
//             {String.fromCharCode(65 + idx)}: { this.convertHTMLChar(choice) }
//           </Box>
//         )
//       })
//     );
//   }

//   convertHTMLChar(str) {
//     const entities = new Entities();
//     return entities.decode(str);
//   }
  
//   render() {

//     if(this.props.data.loading) return <div></div>
    
//     return (
//       <GridItem 
//         gridRow={this.props.gridRow} 
//         gridColumn={this.props.gridColumn}
//         flexDirection="column"
//         fontFamily="VT323"
//         fontSmooth="none"
//       >
//         <Text
//           p="0 0 2rem 0;"
//           fontSize="2.1rem"
//         >
//           {this.convertHTMLChar(this.props.data.trivia.question) || ""}
//         </Text>
//         <Box
//           isA="ul"
//         >
//           {this.displayGuesses()}
//         </Box>
//         <GuessForm/>
//       </GridItem>
//     );
//   }
// }

// export default graphql(query)(
//   graphql(mutation)(TriviaQuestion)
// );

// export default TriviaQuestion;
