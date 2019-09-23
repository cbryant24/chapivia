import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';

import userQuery from '../queries/CurrentUser';
import triviaQuery from '../queries/Trivia';

import Modal from './Modal';

// import requireAuth from './HOC/requireAuth';
import { GridItem, BoxAll, Text, FlexItem, BounceAnimations } from './element';
import GuessList from './GuessList';
import TriviaQuestion from './TriviaQuestion';

// import Scoreboard from './Scoreboard';
// import GuessForm from './GuessForm';
// import Winner from './Winner';

import { DAILY_TRIVIA } from '../localState/Queries';

const Game = (props) => {
  const { loading: userLoading, data: userData } = useQuery(userQuery);
  const { loading: triviaLoading, data: triviaData } = useQuery(triviaQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const lastLocation = useLastLocation() || {};
  const { data } = useQuery(DAILY_TRIVIA);
  const client = useApolloClient();
  // debugger

  useEffect( () => {
    if (userLoading) return;
    
    if (!userData.user) return props.history.push('/');
  });

  useEffect( () => {
    if (triviaLoading) return;
    // debugger
    try {
      client.writeData({
        data: {
          localTrivia: {
            questionId: triviaData.dailyTrivia.id,
            question: triviaData.dailyTrivia.question,
            questionChoices: triviaData.dailyTrivia.triviaChoices.choices,
            questionChoicesId: triviaData.dailyTrivia.triviaChoices.id,
            __typename: 'dailyTrivia'
          }
        }
      });
    } catch(err) {
      //TODO: add proper error handling
      console.log('error getting trivia data', err)
    }
  }, [triviaData]);

  useEffect( () => {
    if (lastLocation.pathname !== '/signup') return;

    if (!userData.user) return;

    toggleModal();
    setModalMessage(`Welcome To Chapivia ${ userData.user.name }!`);
  }, [userData]);

  const toggleModal = e => setIsOpen(!isOpen);

  if (userLoading || triviaLoading) return <div></div>;

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      <GridItem
        gridRow="1 / span 2"
        gridColumn="1 / span 1"
      >
        <GuessList/>
      </GridItem>
      <GridItem
        gridRow="1 / span 1"
        gridColumn="2 / span 1"
        zIndex="5"
      >
        <TriviaQuestion/>
      </GridItem>
    </React.Fragment>
  )
}
// class Game extends Component {


//   render() {
//     console.log(this.props)
//     // debugger

//     return (
//       <React.Fragment>
//           <Element.GridItem
//             gridRow="1 / span 2"
//             gridColumn="1 / span 1"
//           >
//             <GuessList />
//           </Element.GridItem>


//         {/* <Element.Grid
//           width="100%"
//           p="1rem 2rem"
//           zIndex="10"
//           templateColumns="1fr 1.5fr .5fr"
//           templateRows="1fr 1fr"
//           gridGap="2rem 4rem"
//           justifyContent="space-between"
//         >
//           <Element.GridItem
//             gridRow="1 / span 2"
//             gridColumn="1 / span 1"
//           >
//             <GuessList />
//           </Element.GridItem>
//           <Element.GridItem
//             gridRow="1 / span 1"
//             gridColumn="2 / span 1"
//           >
//             <TriviaQuestion />
//           </Element.GridItem>
//           <Element.GridItem
//             gridRow="1 / span 2"
//             gridColumn="3 / span 1"
//           >
//             <Scoreboard />
//           </Element.GridItem>
//           <Element.GridItem
//             gridRow="2 / span 1"
//             gridColumn="2 / span 1"
//           >
//             <Winner />
//           </Element.GridItem>
//         </Element.Grid> */}
//       </React.Fragment>
//     );
//   }
// }

export default Game;