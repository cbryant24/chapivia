import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from '../actions';

class GameController extends Component {
  // constructor(props) {
  //   super(props);

  //   this.socket = openSocket('http://localhost:4000');

  //   // this.sendMessage = this.sendMessage.bind(this);
  // }

  // componentDidMount() {
  //   // debugger
  //   const self = this;
  //   this.socket.on('gameStatus', status => {
  //     self.props.updateGameStatus(status);
  //     console.log('the status is being emitted', status);
  //   });

  //   this.socket.on('displayTriviaAnswer', status => {
  //     self.props.displayTriviaAnswer(status);
  //     // debugger
  //   });
  // }
  render() {
    return <div></div>
  }
}

// export default connect(null, actions)(GameController);

export default GameController;