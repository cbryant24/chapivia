import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type RootQueryType {
    isLoggedIn: Boolean!
  }
`

export const resolvers = {};