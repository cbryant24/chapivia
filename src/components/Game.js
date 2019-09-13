import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';

import query from '../queries/CurrentUser';
import Modal from './Modal';

// import requireAuth from './HOC/requireAuth';
import { GridItem, BoxAll, Text, FlexItem, BounceAnimations } from './element';
// import GuessList from './GuessList';
// import TriviaQuestion from './TriviaQuestion';
// import Scoreboard from './Scoreboard';
// import GuessForm from './GuessForm';
// import Winner from './Winner';

import { GET_USER } from '../localState/Queries';

const Game = (props) => {
  const { loading, data } = useQuery(query);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const lastLocation = useLastLocation() || {};
  // debugger

  useEffect( () => {
    if (loading) return;
    
    if (!data.user) return props.history.push('/');
  })

  useEffect( () => {
    if (lastLocation.pathname !== '/signup') return;

    if (!data.user) return;

    toggleModal();
    setModalMessage(`Welcome To Chapivia ${data.user.name}!`);
  }, [data.user]);

  const toggleModal = e => setIsOpen(!isOpen);

  if (loading) return <div></div>

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
        color="black"
      >
        Hello World
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