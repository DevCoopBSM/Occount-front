import styled from "styled-components";

export const CompeleteWrap = styled.div`
  margin: 0 auto;
  width: 900px;
  height: 700px;
`;

export const ExChangeDetailWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0")};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0")};
  width: ${(props) => (props.width ? props.width : "800px")};
  height: 50px;
  border-top: ${(props) => (props.border ? props.border : null)};
`;

export const InfoText = styled.div`
  color: ${(props) => (props.color ? props.color : "#333")};
  font-weight: 400;
  font-size: 23px;
  margin-top: 5px;
  margin-left: 5px;
`;

export const Exchange = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "25px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : null)};
`;

export const UseLogWrap = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
`;

export const PointContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const rightWrap = styled.div`
  width: 50%;
`;

export const leftWrap = styled.div`
  width: 50%;
`;

// 페이지네이션 스타일
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;

    li {
      margin: 0 5px;

      &.selected a {
        background-color: #007bff;
        color: white;
      }

      &.disabled a {
        color: #ccc;
      }

      a {
        display: block;
        padding: 8px 12px;
        border: 1px solid #007bff;
        border-radius: 4px;
        color: #007bff;
        cursor: pointer;
        text-decoration: none;

        &:hover {
          background-color: #007bff;
          color: white;
        }
      }
    }
  }
`;

export const PointLogWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  margin-bottom: 10px;
  padding-top: 15px;
  width: 440px;
  height: 70px;
  background-color: ${(props) => props.backgroundColor || "#eff0f2"};
  border: 1px solid ${(props) => props.borderColor || "#EFF0F2"};
  border-radius: 8px;
  cursor: pointer;
`;

export const DateText = styled.span`
  margin-left: 70px;
  text-align: left;
  font-size: 23px;
`;

export const AmountText = styled.span`
  margin-right: 50px;
  text-align: right;
  font-size: 23px;
`;

export const DetailWrap = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: expand 0.3s ease-out;
  @keyframes expand {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 1000px;
      opacity: 1;
    }
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DetailLabel = styled.div`
  font-weight: bold;
  color: #333;
`;

export const DetailValue = styled.div`
  color: #666;
`;

export const ModalButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  width: 200px;
  display: flex;
  justify-content: center;
`;
