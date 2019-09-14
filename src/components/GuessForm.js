import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { graphql, compose } from 'react-apollo';

import { GridItem, Field, OutlineButton, Input, FlexItem } from './element';
import * as Element from './element';

import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
// import TriviaQuery from '../queries/Trivia';
import GuessListQuery from '../queries/GuessList';
import CurrentUserQuery from '../queries/CurrentUser';


import FormApp from './Form/App';
import { validate } from './helpers/validators';

function GuessForm(props) {
  const { loading: unguessedPlayersLoading, data: unguessedPlayersData } = useQuery(UnguessedPlayers);
  const { loading: currentUserLoading, data: currentUserData } = useQuery(CurrentUserQuery);
  const [ guess, { data: guessData }] = useMutation(mutation);
  
  async function recordGuess(event, vals) {
    const { id } = props.players.nonGuessedPlayers.find( player => player.id == vals.player);
    debugger
    guess({
      variables: {
        userId: id,
        questionId: props.triviaData.trivia.id,
        questionChoiceId: props.triviaData.trivia.questionChoice.id,
        guess: props.triviaData.trivia.questionChoice.choices[vals.guess.toUpperCase().charCodeAt(0) - 65]        
      },
      refetchQueries: [{ query: UnguessedPlayers }, { query: GuessListQuery }]
    }).catch( res => {
      //TODO add error handling to guess mutation
      debugger
      const errors = res.graphQLErrors.map(error => error.message);
    });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   if( !this.state.guess || !this.state.player ) {
  //     return this.setState(() => ({
  //       error: {
  //         guess: this.state.guess ? '' : 'Enter a guess',
  //         player: this.state.player ? '' : 'Select a player'
  //       }
  //     }));
  //   }

  //   if( this.props.signedIn.user.id !== this.state.player && this.props.signedIn.user.id !== "7") {
  //     return this.setState(() => ({
  //       error: {
  //         player: 'Please guess only for yourself'
  //       }
  //     }));
  //   }

  //   const { trivia } = this.props.triviaData;
    
  //   this.props.guessMutation({
  //     variables: {
  //       userId: this.state.player,
  //       questionId: trivia.id,
  //       questionChoiceId: trivia.questionChoice.id,
  //       guess: trivia.questionChoice.choices[this.state.guess.charCodeAt(0) - 65]        
  //     },
  //     refetchQueries: [{ query: UnguessedPlayers }, { query: GuessListQuery }]
  //   }).catch( res => {
  //     //TODO add error handling to guess mutation
  //     debugger
  //     const errors = res.graphQLErrors.map(error => error.message);
  //   });

  //   this.clearForm(event);
  // }
  
  // const getPlayers = async () => {
  //   const players = props.players.nonGuessedPlayers
  // }

  if (unguessedPlayersLoading) return <div></div>
  
  const inputs = [
    {
      data: {
        type: 'select', 
        name: 'player', 
        label: 'player', 
        initialValue: '',
        required: true,
        inputData: {
          display: 'name',
          value: 'id',
          data: props.players.loading ? [] : props.players.nonGuessedPlayers
        }
      },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { color: 'black' }
    },
    {
      data: { 
        type: 'password', 
        name: 'guess', 
        label: 'guess', 
        placeholder: 'enter guess A, B, C, D', 
        initialValue: '',
        required: true,
      },
      fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { color: '#ff00f3' }
    }
  ]

  const form = {
    data: { name: 'guessForm', submit: 'signup', cb: recordGuess },
    style: { height: '60vh', justifyContent: 'space-around', flexDirection: 'column', px: '4rem',  },
  }

return (
    <FlexItem
      border="1px solid black"
      p="2rem"
      bg="black"
      width="60%"
      zIndex="20"
    >
      <FormApp 
        form={form}
        inputs={inputs}
        validate={validate}
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