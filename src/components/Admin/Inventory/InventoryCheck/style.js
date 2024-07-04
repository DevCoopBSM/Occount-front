import styled from 'styled-components';

export const Dbutton = styled.button`
  margin-right: 5px;
  margin-left: 5px;
  width: 200px;
  height: 40px;
  color: #fff;
`;

export const ButtonContainer = styled.div`
  margin-right: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: flex-end;
  display: flex;
`;

export const ContentWrap = styled.div`
  padding: 20px;
`;

export const InfoHeader = styled.div`
  margin-bottom: 20px;
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

export const InfoInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;


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

export const SelectedItemList = styled.div`
  margin: 10px 0;
`;

export const SelectedItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

export const RemoveButton = styled.button`
  color: red;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;