import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../../queries/CurrentUser';
import { connect } from 'react-redux';

export default (WrappedComponent) => {
  class RequireAuth extends Component {

    // componentDidMount() {
    //   this.shouldNavigateAway();
    // }
  
    // componentDidUpdate() {
    //   this.shouldNavigateAway();
    // }
  
    // shouldNavigateAway() {
    //   if(!this.props.auth) {
    //     this.props.history.push('/');
    //   }
    // }

    componentDidUpdate(prevProps) {
      if(!this.props.data.loading && !this.props.data.user) {
        this.props.history.push('/');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};