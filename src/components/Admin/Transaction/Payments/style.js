import styled from 'styled-components';

export const PointWrap = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  width: 100%;
  height: 150px;

  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`;

export const PointInTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PointInput = styled.input`
  width: 450px;
  border-radius: 10px;
  border: 1px solid #ccc; /* 기본값 설정 */
  
  border: ${({ isError }) => (isError ? '2px solid red' : '1px solid #ccc')};
  font-weight: ${({ isError }) => (isError ? 'bold' : 'normal')};
`;

export const NumberInput = styled.input`
  border-radius: 10px 0px 0px 10px;
  width: 240px;
`;

export const PointBottom = styled.div`
  display: flex;
  justify-content: end;

  margin-top: 10px;

  width: 100%;
  height: 50px;
`;

export const UseLogWrap = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
`;

export const rightWrap = styled.div`
  width: 50%;
`;

export const leftWrap = styled.div`
  width: 50%;
`;

export const PageWrap = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
`;
