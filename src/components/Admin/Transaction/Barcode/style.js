import styled from "styled-components";

export const BarcodeWrap = styled.div`
  width: 100%;
  height: 600px;
`;

export const BarcodeIn = styled.form`
  margin: 0 auto;
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BarcodeInput = styled.input`
  width: 500px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #d3d3d3;
  border-radius: 0%;
`;

export const ConfirmButton = styled.button`
  width: 500px;
`;

export const LogoImg = styled.img`
  height: 130px;
  margin-bottom: 30px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;
