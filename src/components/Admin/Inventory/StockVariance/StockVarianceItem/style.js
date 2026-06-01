import styled from 'styled-components';

const maxWidth = '900px';

export const Info = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${maxWidth};
  height: 55px;
  border-bottom: 1px solid #d3d3d3;
`;

export const Infochoose = styled.div`
  width: 25%;
  height: 55px;
  text-align: center;
  line-height: 60px;
`;

export const Infochooses = styled.div`
  width: 300px;
  height: 55px;
  text-align: center;
  line-height: 60px;
`;

export const Infotext = styled.p`
  font-size: 20px;
  text-align: center;
  color: #8A8A8A;
`;
