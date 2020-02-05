import React from 'react';
import { FlexDiv, P } from '@cbryant24/styled-react';

import { useAuth } from '../hooks';

function TopMenu(props) {
  const { user, signout } = useAuth();
  console.log(user, signout);

  return (
    <FlexDiv>
    <FlexDiv
        flexDirection="column"
        alignItems="center"
        fontSizeModule={[1]}
      >
        <P>Trivia Topic</P>
        <P themeStyle=''>Movies</P>
      </FlexDiv>
      <FlexDiv
        flexDirection="column"
        alignItems="center"
        fontSizeModule={[1]}
      >
        {user ? <P onClick={signout}>Logout</P> : ''}
      </FlexDiv>

    </FlexDiv>
  )
}

export default TopMenu;