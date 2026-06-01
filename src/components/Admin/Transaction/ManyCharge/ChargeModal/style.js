import styled from 'styled-components';

export const Infobutton = styled.button`
  margin-right: ${(props) => (props.mRight ? props.mRight : '')};
  width: 150px;
  height: 45px;
  color: #fff;
`;

export const PointWrap = styled.div`
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;

    height: 150px;
    /* background-color: orange; */
`;

export const TitleWrap = styled.div`
    margin: 0 auto;
    text-align: center;

    height: 50px;
`;

export const ContentTitle = styled.h1`
    margin: 0 auto;
    font-size: 20px;
    color: #333;
`;

export const ContentSubTitle = styled.h3`
    font-size: 25px;
    color: #555;
`;

export const BtnWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    text-align: center;
    margin-left: 330px;

    width: 230px;
    height: 100px;

`;

export const String = styled.div`
    border-top: 1px solid;
    margin: 0 auto;
`;

export const PointInTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const PointInput = styled.input`
  width: 350px;
  border-radius: 10px;
`;

export const NumberInput = styled.input`
  border-radius: 10px;
  width: 350px;
`;

export const PointBottom = styled.div`
  display: flex;
  justify-content: end;

  margin-top: 10px;

  width: 100%;
  height: 50px;
`;

export const InfoText = styled.div`
    color: ${(props) => (props.color ? props.color : '#333')};
    font-size: 23px;
    width: 100px;
`;

export const StudentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

export const StudentListItem = styled.li`
  padding: 5px 0;
  font-size: 18px;
`;
