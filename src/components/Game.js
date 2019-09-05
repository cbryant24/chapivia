import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import query from '../queries/CurrentUser';

// import requireAuth from './HOC/requireAuth';
import { GridItem } from './element';
import GuessList from './GuessList';
import TriviaQuestion from './TriviaQuestion';
import Scoreboard from './Scoreboard';
import GuessForm from './GuessForm';
import Winner from './Winner';


const Game = (props) => {
  const { loading, error, data, client } = useQuery(query);

  if (loading) return <div></div>

  if (!client.user) {
    props.history.push('/')
  }

  return (
    <React.Fragment>
          <GridItem
            gridRow="1 / span 2"
            gridColumn="1 / span 1"
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