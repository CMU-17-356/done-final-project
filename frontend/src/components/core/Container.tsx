import React from 'react';
import styled, { StyledComponent } from 'styled-components';

const createContainer = (Container: any, props: any) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

const StyledMainContainer = styled.div`
  margin: 0 auto;
  padding: 4vw 0;
  width: 90%;
`;

const StyledHomeContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  padding-bottom: 20px;
`;

const StyledMinimalContainer = styled.div`
  margin: 0 auto;
  padding: 4vw 0;
  width: 80%;
`;

export const MainContainer = (props: any) => createContainer(StyledMainContainer, props);

export const HomeContainer = (props: any) => createContainer(StyledHomeContainer, props);

export const MinimalContainer = (props: any) => createContainer(StyledMinimalContainer, props);

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
