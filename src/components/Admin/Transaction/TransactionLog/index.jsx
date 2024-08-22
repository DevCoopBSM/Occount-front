import React, { useEffect, useState } from 'react';
import * as _ from './style.js'; // 스타일 파일을 _로 매핑
import { PrettyDateTime } from 'utils/Date';
import axiosInstance from 'utils/Axios';

const TransactionLog = ({ userCode, type }) => {
  const [logEntries, setLogEntries] = useState([]);
  const [modalStates, setModalStates] = useState([]);

  useEffect(() => {
    if (userCode) {
      const fetchLogData = async () => {
        try {
          const endpoint = type === 'charge' ? 'charge' : 'pay';
          const response = await axiosInstance.get(`v2/transaction/log/${endpoint}/${userCode}`);
          const logData = response.data;

          // Date 배열을 Date 객체로 변환하여 사용
          const formattedData = logData.map(entry => ({
            ...entry,
            [`${type}Date`]: new Date(...entry[`${type}Date`])
          }));

          setLogEntries(formattedData);
          setModalStates(new Array(formattedData.length).fill(false));
        } catch (error) {
          console.error(`Error fetching ${type} log:`, error);
        }
      };

      fetchLogData();
    }
  }, [userCode, type]);

  const toggleModal = (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates(updatedModalStates);
  };

  const LogDetails = ({ logEntry }) => {
    const dateKey = `${type}Date`;
    const amountKey = type === 'charge' ? 'chargedPoint' : 'payedPoint';
    const actionText = type === 'charge' ? '충전' : '결제';
    const barColor = type === 'charge' ? '#e6ebff' : '#e7e7e7';

    const safeBeforePoint = logEntry.beforePoint !== null && logEntry.beforePoint !== undefined ? logEntry.beforePoint.toLocaleString() : 'N/A';
    const safeAmount = logEntry[amountKey] !== null && logEntry[amountKey] !== undefined ? logEntry[amountKey].toLocaleString() : 'N/A';
    const safeAfterPoint = logEntry.afterPoint !== null && logEntry.afterPoint !== undefined ? logEntry.afterPoint.toLocaleString() : 'N/A';

    return (
      <_.LogDetailsWrap>
        <_.LogDetailsBar barColor={barColor}>
          <div>{PrettyDateTime(logEntry[dateKey])}</div>
          <_.StatusText>{actionText}</_.StatusText>
        </_.LogDetailsBar>
        <_.LogDetailsSection>
          <_.LogInfoWrap>
            <_.LogInfoText>원래금액</_.LogInfoText>
            <_.LogInfoText>{safeBeforePoint}원</_.LogInfoText>
          </_.LogInfoWrap>
          <_.LogInfoWrap>
            <_.LogInfoText>{`${actionText}금액`}</_.LogInfoText>
            <_.LogInfoText>{type === 'charge' ? `+${safeAmount}` : `-${safeAmount}`}원</_.LogInfoText>
          </_.LogInfoWrap>
          <hr style={{ marginTop: '40px' }} />
          <_.LogInfoWrap>
            <_.LogInfoText>최종금액</_.LogInfoText>
            <_.LogInfoText style={{ color: 'black', fontWeight: 700 }}>
              {safeAfterPoint}원
            </_.LogInfoText>
          </_.LogInfoWrap>
        </_.LogDetailsSection>
      </_.LogDetailsWrap>
    );
  };

  return (
    <div style={{ flexDirection: 'column' }}>
      {logEntries.map((item, index) => (
        <div key={index}>
          <_.LogWrap onClick={() => toggleModal(index)} backgroundColor={type === 'charge' ? "#E6EBFF" : "#E7E7E7"}>
            <_.LogEntry>
              <_.LogDate>{PrettyDateTime(item[`${type}Date`])}</_.LogDate>
              <_.LogAmount positive={type === 'charge'}>
                {type === 'charge' ? `+` : `-`}
                {item[type === 'charge' ? 'chargedPoint' : 'payedPoint'] !== null && item[type === 'charge' ? 'chargedPoint' : 'payedPoint'] !== undefined
                  ? item[type === 'charge' ? 'chargedPoint' : 'payedPoint'].toLocaleString()
                  : 'N/A'}원
              </_.LogAmount>
              <_.LogType>{type === 'charge' ? '충전' : '결제'}</_.LogType>
            </_.LogEntry>
          </_.LogWrap>
          {modalStates[index] && <LogDetails logEntry={item} />}
        </div>
      ))}
    </div>
  );
};

export default TransactionLog;
