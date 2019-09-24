import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { graphql, compose } from 'react-apollo';

import { GridItem, Field, OutlineButton, Input, FlexItem } from './element';
import * as Element from './element';

import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
// import TriviaQuery from '../queries/Trivia';
import GuessListQuery from '../queries/GuessList';
import CurrentUserQuery from '../queries/CurrentUser';
import { DAILY_TRIVIA } from '../localState/Queries';

import FormApp from './Form/App';
import { validate } from './helpers/validators';
import theme from './elements/theme';

import Modal from './Modal';

function GuessForm(props) {
  const { data: { localTrivia } } = useQuery(DAILY_TRIVIA);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { loading: unguessedPlayersLoading, data: unguessedPlayersData } = useQuery(UnguessedPlayers);
  const { loading: currentUserLoading, data: currentUserData } = useQuery(CurrentUserQuery);
  const [ guess, { data: guessData }] = useMutation(mutation);
  
  async function recordGuess(event, vals) {
    try {
      const { data: { guess: userGuess } } = await guess({
        variables: {
          userId: parseInt(vals.player),
          questionId: parseInt(localTrivia.questionId),
          questionChoiceId: parseInt(localTrivia.questionChoicesId),
          guess: localTrivia.questionChoices[vals.guess.toUpperCase().charCodeAt(0) - 65]        
        },
        refetchQueries: [{ query: UnguessedPlayers }, { query: GuessListQuery }]
      })

      toggleModal();
      setModalMessage(`You're Answer is...${ userGuess.isCorrect ?'YES!' : 'WRONG! HAHA' }!`);

    } catch(err) {
      //TODO add error handling to guess mutation
      console.log(err)
      debugger
      toggleModal();
      setModalMessage(`There was an error! Try Again!`);
    }
  }

  if (currentUserLoading || unguessedPlayersLoading) return <div></div>;

  const toggleModal = e => setIsOpen(!isOpen);

  unguessedPlayersData.nonGuessedPlayers && 
  unguessedPlayersData.nonGuessedPlayers[0].id !== null && 
  unguessedPlayersData.nonGuessedPlayers.unshift({id: null, name: null});

  const inputs = [
    currentUserData.user.role === "admin" ? {
      data: {
        type: 'select', 
        name: 'player', 
        label: 'player', 
        initialValue: '',
        required: true,
        inputData: {
          display: 'name',
          value: 'id',
          options: unguessedPlayersData.nonGuessedPlayers
        }
      },
      fieldStyle: { 
        width: '75%', 
        maxHeight: '5rem', 
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      inputStyle: { background: 'white', color: 'black', borderRadius: '1em', minHeight: '2.5em' }
    } : null,
    {
      data: {
        type: 'password', 
        name: 'guess', 
        label: 'guess', 
        placeholder: 'enter guess A, B, C, D', 
        initialValue: '',
        required: true,
      },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    }
  ]

  const form = {
    data: { name: 'guessForm', submit: 'signup', cb: recordGuess },
    style: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-evenly', 
      flexDirection: 'column', 
      backgroundColor: 'black',
      border: '1px solid black',
      width: [1],
      px: [4],
      zIndex: 20
    },
  }

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3]} },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ]

return (
    <FlexItem
      width="60%"
      height="75vh"
      zIndex={[2]}
    >
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      <FormApp 
        form={form}
        onSubmit={recordGuess}
        inputs={inputs}
        validate={validate}
        buttons={buttons}
      />
    </FlexItem>
  );
}


// class GuessForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // selectedPlayer: '',
//       player: {
//         value: '',
//         touched: false,
//         error: {
//           status: false,
//           message: ''
//         }
//       },
//       guess: {
//         value: '',
//         touched: false,
//         error: {
//           status: false,
//           message: ''
//         }
//       }
//     }
//   }

//   addPlayersToForm() {
//     return (
//       this.props.players.nonGuessedPlayers.map( player => {
//         return <option key={player.id} value={player.id}>{player.name}</option>
//       })
//     );
//   }

//   handleGuessSelection(event) {
//     // const value = event.target.value.toUpperCase();
//     const { name: field, value } = event.target;
//     const valid = validate.input({ [field]: value });

//     if (!valid)
//       return this.setError('character', field);

//     return this.setState( state => ({
//       ...state,
//       [field]: {
//         ...state[field],
//         value,
//         error: {
//           status: false,
//           message: ''
//         }
//       }
//     }));
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     if( !this.state.guess || !this.state.player ) {
//       return this.setState(() => ({
//         error: {
//           guess: this.state.guess ? '' : 'Enter a guess',
//           player: this.state.player ? '' : 'Select a player'
//         }
//       }));
//     }

//     if( this.props.signedIn.user.id !== this.state.player && this.props.signedIn.user.id !== "7") {
//       return this.setState(() => ({
//         error: {
//           player: 'Please guess only for yourself'
//         }
//       }));
//     }

//     const { trivia } = this.props.triviaData;
    
//     this.props.guessMutation({
//       variables: {
//         userId: this.state.player,
//         questionId: trivia.id,
//         questionChoiceId: trivia.questionChoice.id,
//         guess: trivia.questionChoice.choices[this.state.guess.charCodeAt(0) - 65]        
//       },
//       refetchQueries: [{ query: UnguessedPlayers }, { query: GuessListQuery }]
//     }).catch( res => {
//       //TODO add error handling to guess mutation
//       debugger
//       const errors = res.graphQLErrors.map(error => error.message);
//     });

//     this.clearForm(event);
//   }

//   handleBlur = (field) => (event) => {
//     const { value } = this.state[field];
//     const valid = validate.blur({ [field]: value });

//     if (!this.state[field].touched) {
//       this.setState( state =>  ({
//         ...state, 
//         [field]: {
//           ...state[field],
//           touched: true,
//         }
//       }));
//     }

//     if(!valid) 
//       return this.setError('input', field);

//     if(this.state[field].error.status)
//       return this.setError('clear', field);
//   }

//   handlePlayerSelect(event) {
//     const {value: player} = event.target;
//     this.setState( () => ({ player: player }) );
//   }

//   clearForm(event) {
//     event.preventDefault();

//     this.setState( () => ({ 
//       error: {
//         guess: '',
//         player: '' 
//        },
//        guess: '',
//        player: '',
//     }));
//   }

//   setError( type, field = "guess") {
//     switch(type) {
//       case 'character':
//         this.setState( state => ({
//           ...state,
//           [field]: {
//             ...state[field],
//             error: {
//               status: true,
//               message: `Invalid character used in ${field}`
//             }
//           }
//         }));
//         break
//       case 'player':
//         this.setState( state => ({
//           ...state,
//           [field]: {
//             ...state[field],
//             error: {
//               status: true,
//               message: `Please select a player`
//             }
//           }
//         }))
      
//       default:
//         this.setState( state =>  ({
//           ...state, 
//           player: {
//             ...state.player,
//             error: { 
//               status: false,
//               message: ''
//             }
//           },
//           guess: {
//             ...state.guess,
//             error: { 
//               status: false,
//               message: ''
//             }
//           }
//         }));
//     }
//   }

//   render() {

//     if(new Date().getHours() >= 17) return (
//       <GridItem
//         gridRow={this.props.gridRow}
//         gridColumn={this.props.gridColumn}
//       >
//         Checkback for another trivia!
//       </GridItem>
//     );

//     if(this.props.players.loading) return <div></div>

//     return (
//       <GridItem
//         gridRow={this.props.gridRow}
//         gridColumn={this.props.gridColumn}
//       >
//         <Element.FlexForm 
//           flexDirection="column"
//           onSubmit={(event) => this.handleSubmit(event)}
//         >
//           <Field
//             name="player"
//             type="select"
//             label="Player"
//             flexDirection="column"
//             color="black"
//             width="75%"
//             mb="2rem"
//             // error={this.state.error.player}
//             onChange={(event) => this.handlePlayerSelect(event)}
//             value={this.state.player.value}
//           >
//             <option value=''></option>
//             {this.addPlayersToForm()}
//           </Field>
//           <Field 
//             name="guess"
//             type="password"
//             label="Guess"
//             flexDirection="column"
//             width="75%"
//             onBlur={ this.handleBlur('guess') }
//             value={this.state.guess.value}
//             onChange={ (event) => this.handleGuessSelection(event) }
//           >
//           </Field>
//           <Flex
//             mt="1rem"
//             justifyContent="flex-start"
//           >
//             <Input
//               color="white"
//               width="10rem"
//               borderColor='primary'
//               type="submit"
//               value="Submit"
//               mr="2rem"
//             />
//             <Input
//               color="white"
//               width="10rem"
//               borderColor='primary'
//               textAlign="center"
//               type="cancel"
//               value="Cancel"
//               onClick={ (event) => this.clearForm(event)}
//             />
//           </Flex>
//         </Element.FlexForm>
        
//       </GridItem>
//     );
//   }
// }

// export default compose(
//   graphql(UnguessedPlayers, {
//     name: "players"
//   }),
//   graphql(TriviaQuery, {
//     name: "triviaData"
//   }),
//   graphql(mutation, {
//     name: 'guessMutation'
//   }),
//   graphql(CurrentUserQuery, {
//     name: 'signedIn'
//   })
// )(GuessForm);

export default GuessForm;