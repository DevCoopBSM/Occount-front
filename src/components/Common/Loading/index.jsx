import React from 'react';
import { ReactComponent as OccountLogo } from 'assets/HeadLogo.svg';
import styled, { keyframes } from 'styled-components';
import { useLoading } from 'context/loadingContext';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const RotatingLogo = styled(OccountLogo)`
  animation: ${rotate} 2s linear infinite;
  width: 100px;
  height: 100px;
`;

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <LoadingWrapper>
      <RotatingLogo />
    </LoadingWrapper>
  );
};

export default Loading;