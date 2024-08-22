import styled from "styled-components";

export const LogWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  width: 100%;
  max-width: 500px;
  background-color: ${(props) => props.backgroundColor || "#eff0f2"};
  border: 1px solid ${(props) => props.borderColor || "#EFF0F2"};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#d6d9e0"};
  }
`;

export const LogEntry = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LogDate = styled.div`
  font-size: 14px;
  color: #333;
  flex: 1;
`;

export const LogAmount = styled.div`
  font-size: 16px;
  color: ${(props) => (props.positive ? "#4CAF50" : "#F44336")};
  font-weight: bold;
  flex: 1;
  text-align: right;
`;

export const LogType = styled.div`
  font-size: 14px;
  color: #666;
  flex: 1;
  text-align: right;
`;

export const LogDetailsWrap = styled.div`
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const LogDetailsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.barColor || "#e7e7e7"};
  border-radius: 6px 6px 0 0;
  padding: 10px;
  font-weight: bold;
  color: #333;
`;

export const LogDetailsSection = styled.div`
  padding: 20px;
`;

export const LogInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const LogInfoText = styled.span`
  font-size: 16px;
  color: #4a4a4a;
`;

export const StatusText = styled.span`
  font-size: 14px;
  color: #fff;
  background-color: ${(props) => props.statusColor || "#4CAF50"};
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
`;

export const LogToggleButton = styled.div`
  font-size: 14px;
  color: ${(props) => props.color || "#007bff"};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.hoverColor || "#0056b3"};
  }
`;
