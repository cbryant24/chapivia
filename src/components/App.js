import React from 'react';
import styled from 'styled-components';

const GridApp = styled.section`
  display: grid;
  height: 100vh;
  grid-template-columns: [column-start] 1fr [first-column-end second-column-start]
                         1fr [last-column-end];
  grid-template-rows: [row-start] 1fr [first-row-end second-row-start] 
                      1fr [second-row-end third-row-start] 
                      1fr [last-row-end];
  background: linear-gradient(to bottom right, #f85032, #e73827);
  
`

export default ({ children }) => {
  return (
    <GridApp>
      {children}
    </GridApp>
  );
}