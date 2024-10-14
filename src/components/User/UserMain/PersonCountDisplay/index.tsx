import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Container, Title, LeftSection, Count, Status } from './PersonCountDisplayStyles';

interface PersonCountData {
  avg_count: number;
}

const PersonCountDisplay: React.FC = () => {
  const [avgPersonCount, setAvgPersonCount] = useState<number>(0);
  const [status, setStatus] = useState<string>('아직 아무도 없어요');
  const [color, setColor] = useState<string>('#D3D3D3');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { lastMessage, readyState } = useWebSocket('wss://occount.bsm-aripay.kr/ws/person_count', {
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  const updateStatus = useCallback((count: number) => {
    if (count === 0) {
      setStatus('아직 아무도 없어요');
      setColor('#D3D3D3');
    } else if (count < 10) {
      setStatus('쾌적합니다');
      setColor('#C1E1C1');
    } else if (count < 20) {
      setStatus('적당해요');
      setColor('#FAFAD2');
    } else {
      setStatus('북적북적');
      setColor('#FFB6C1');
    }
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data: PersonCountData = JSON.parse(lastMessage.data);
        setAvgPersonCount(Math.round(data.avg_count));
        updateStatus(data.avg_count);
      } catch (error) {
        console.error('웹소켓 데이터 파싱 오류:', error);
      }
    }
  }, [lastMessage, updateStatus]);

  useEffect(() => {
    setIsConnected(readyState === ReadyState.OPEN);
  }, [readyState]);

  if (!isConnected) {
    return null;
  }

  return (
    <Container color={color}>
      <LeftSection>
        <Title>현재 매장 인원</Title>
        <Count>{avgPersonCount}명</Count>
      </LeftSection>
      <Status>{status}</Status>
    </Container>
  );
};

export default PersonCountDisplay;