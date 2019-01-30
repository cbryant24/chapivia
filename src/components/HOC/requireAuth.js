import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../../queries/CurrentUser';
import { connect } from 'react-redux';

export default (WrappedComponent) => {
  class RequireAuth extends Component {

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