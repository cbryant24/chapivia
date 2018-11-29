// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { store } from '../index';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { Flex, FlexItem, Field, ModalBackground } from './elements';

// class Modal extends Component {
//   componentDidMount() {
//     this.modalTarget = document.createElement('div');
//     this.modalTarget.className = 'modal';
//     document.body.appendChild(this.modalTarget);
//     this._render();
//   }

//   componentWillUpdate() {
//     this._render();
//   }

//   componentWillUnmount() {
//     ReactDOM.unmountComponentAtNode(this.modalTarget);
//     document.body.removeChild(this.modalTarget);
//   }

//   _render() {
//     ReactDOM.render(
//     <Provider store={store}>
//       <Router>
//         <Flex display="hidden">
//           <ModalBackground/>
//           {this.props.children}
//         </Flex>
//       </Router> 
//     </Provider>,
//       this.modalTarget  
//     )
//   }
//   render() {
//     return <noscript />;
//   }
// }

// const mapStateToProps = state => {
//   return {
//     open: state.modal.open
//   };
// }

// export default connect(mapStateToProps, null)(Modal);