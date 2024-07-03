import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as FilterIcon } from 'assets/FilterIcon.svg';

const maxWidth = '900px';

export const InfoContainer = styled.div`
  margin: 0 auto;
  width: ${maxWidth};
  height: 600px;
`;

export const InfoHeader = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  width: ${maxWidth};
  height: 55px;
`;

export const Infotitle = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #333;
`;

export const Infobutton = styled.button`
  margin-right: ${(props) => (props.mRight ? props.mRight : '')};
  width: 150px;
  height: 45px;
  color: #fff;
`;

export const Dbutton = styled.button`
  margin-right: 5px;
  margin-left: 5px;
  width: 200px;
  height: 40px;
  color: #fff;
`;

export const Infolist = styled.div`
  display: flex;
  width: ${maxWidth};
  height: 100vh;
  border: white;
  border-radius: 10px;
  margin-top: 10px;
  flex-direction: column;
`;

export const Info = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: ${maxWidth};
  height: 55px;
  border-bottom: 1px solid #d3d3d3;
  background-color: #e8ebf5;
  border-radius: 30px 30px 0 0;
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
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`;

export const Infotext = styled.span`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-right: 10px;
`;

export const Infosearch = styled.div`
  margin: 0 auto;
  display: flex;
  width: 850px;
  height: 70px;
`;

export const InfoInput = styled.input`
  position: relative;
  margin: 10px 0;
  width: 400px;
  height: 55px;
  border-radius: 10px;
`;

export const Inputbutton = styled.div`
  position: absolute;
  margin-top: 20px;
  margin-left: 350px;
  width: 40px;
  height: 40px;
`;

export const Filter = styled.div`
  width: 41px;
  height: 51px;
  color: #fff;
  margin: auto 0px auto 410px;
`;

export const ButtonContainer = styled.div`
  margin-right: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: flex-end;
  display: flex;
`;

export const ModalContent = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  width: 100%;
  height: 300px;
`;

export const ModalTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const StudentList = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  max-height: 200px;
  overflow-y: auto;
`;

export const StudentListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

export const StudentName = styled.span`
  font-size: 16px;
  color: #333;
`;

export const StudentBarcode = styled(StudentName)``;

export const PointInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonCancel = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ccc;
  color: #333;
`;

export const ButtonConfirm = styled(ButtonCancel)`
  background-color: #3498db;
  color: #fff;
`;

export const FilterImg = styled(FilterIcon)`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const StockInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Modal = styled.div`
  display: flex;
  background-color: #3498db;
  justify-content: center;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  max-width: 80%;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 30px;
  text-align: center;
  justify-content: flex-end;
  width: 500px;
  height: 100px;
`;

export const Date = styled.div``;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const StyledDatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 125px; // 원하는 너비로 설정
    height: 50px; // 원하는 높이로 설정
    font-size: 20px; // 원하는 폰트 크기로 설정
    margin-right: 10px;
  }
`;

export const ContentWrap = styled.div`
  padding: 20px;
`;

export const ContentTitle = styled.h2`
  margin: 0;
`;

export const InfoBody = styled.div`
  margin-bottom: 20px;
`;

export const InfoText = styled.p`
  margin: 10px 0;
`;

// export const InfoInput = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 10px;
// `;

export const ItemList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
  border: 1px solid #d3d3d3;
  margin: 10px 0;
  padding: 0;
  list-style: none;
`;


export const Item = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const AddButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const SelectedItemList = styled.ul`
  border: 1px solid #d3d3d3;
  margin-top: 10px;
  padding: 0;
  list-style: none;
`;

export const SelectedItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #d3d3d3;
`;


export const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
