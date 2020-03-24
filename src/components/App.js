import React from "react";
import { FlexDiv } from "@cbryant24/styled-react";
import Background from "components/Background";
import TopMenu from "components/TopMenu";
// import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

export default ({ children }) => {
  return (
    <FlexDiv minHeight="100vh" flexDirection="column" alignItems="center">
      <Background />
      <TopMenu />
      {children}
    </FlexDiv>
  );
};
