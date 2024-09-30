import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ReactComponent as HappyOring } from 'assets/happyOring.svg';
import { ReactComponent as JjinggeulOring } from 'assets/jjinggeulOring.svg';
import { ReactComponent as UlmangOring } from 'assets/ulmangOring.svg';
import styled, { keyframes, css } from 'styled-components';
import { useLoading } from 'contexts/loadingContext';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateAndShake = keyframes`
  0% { transform: rotate(0deg) translate(0, 0); }
  25% { transform: rotate(90deg) translate(2px, 2px); }
  50% { transform: rotate(180deg) translate(0, 0); }
  75% { transform: rotate(270deg) translate(-2px, 2px); }
  100% { transform: rotate(360deg) translate(0, 0); }
`;

const shake = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 0); }
  20%, 40%, 60%, 80% { transform: translate(5px, 0); }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  position: relative;
`;

const Logo = styled.div`
  width: 100%;
  height: 100%;
`;

const TearsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Tear = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #0066cc;
  border-radius: 50%;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ color }) => color};
  font-weight: bold;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  animation: ${({ isError, is500Error }) => {
    if (isError) {
      return is500Error ? rotateAndShake : shake;
    }
    return rotate;
  }} ${({ isError, is500Error }) => {
    if (isError) {
      return is500Error ? '2s' : '0.5s';
    }
    return '10s';
  }} linear infinite;
`;

const Loading = () => {
  const { isLoading, error, shouldShowLoading } = useLoading();

  const [tears, setTears] = useState([]);
  const logoRef = useRef(null);

  const is400Error = error && error.status >= 400 && error.status < 500;
  const is500Error = error && error.status >= 500 && error.status < 600;

  const generateTear = useCallback(() => {
    if (!logoRef.current) return;

    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    
    const computedStyle = window.getComputedStyle(logoRef.current);
    const transform = computedStyle.getPropertyValue('transform');
    const matrix = new DOMMatrix(transform);
    const currentRotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
    
    const rotationRad = (currentRotation * Math.PI) / 180;
    const baseEyeAngle = Math.random() < 0.5 ?  2 * Math.PI / 5 : 3 * Math.PI / 4;
    const eyeOffset = (Math.random() - 0.5) * Math.PI / 12;
    const tearAngle = rotationRad + baseEyeAngle + eyeOffset;

    return {
      id: Date.now(),
      centerX,
      centerY,
      angle: tearAngle,
      distance: radius * 0.3,
      speed: 1.4,
      opacity: 0.8 + Math.random() * 0.2
    };
  }, []);

  useEffect(() => {
    if (is500Error) {
      const tearInterval = setInterval(() => {
        const newTear = generateTear();
        if (newTear) {
          setTears(prevTears => [...prevTears, newTear]);
        }
      }, 10);
      return () => clearInterval(tearInterval);
    } else {
      setTears([]); // 500 에러가 아닐 때 눈물 초기화
    }
  }, [is500Error, generateTear]);

  useEffect(() => {
    if (is500Error) {
      const animateTears = () => {
        setTears(prevTears => 
          prevTears.map(tear => ({
            ...tear,
            distance: tear.distance + tear.speed,
            x: tear.centerX + Math.cos(tear.angle) * (tear.distance + tear.speed),
            y: tear.centerY + Math.sin(tear.angle) * (tear.distance + tear.speed),
          })).filter(tear => 
            tear.x > -100 && tear.x < window.innerWidth + 100 && 
            tear.y > -100 && tear.y < window.innerHeight + 100
          )
        );
      };

      const tearAnimationFrame = requestAnimationFrame(function animate() {
        animateTears();
        requestAnimationFrame(animate);
      });
      return () => cancelAnimationFrame(tearAnimationFrame);
    }
  }, [is500Error]);

  const renderLogo = () => {
    if (is500Error) {
      return <UlmangOring />;
    } else if (is400Error) {
      return <JjinggeulOring />;
    } else {
      return <HappyOring />;
    }
  };

  if (!shouldShowLoading) return null;

  return (
    <LoadingWrapper>
      <LogoContainer>
        <LogoWrapper isError={!!error} is500Error={is500Error} ref={logoRef}>
          <Logo>{renderLogo()}</Logo>
        </LogoWrapper>
        {is500Error && (
          <TearsContainer>
            {tears.map(tear => (
              <Tear
                key={tear.id}
                style={{
                  left: `${tear.x}px`,
                  top: `${tear.y}px`,
                  opacity: tear.opacity * Math.min(tear.distance / (tear.speed * 10), 1),
                  transform: `scale(${Math.min(1 + tear.distance / 300, 1.5)})`
                }}
              />
            ))}
          </TearsContainer>
        )}
      </LogoContainer>
      {error && (
        <Message color={is500Error ? 'red' : 'orange'}>
          {error.status ? `${error.status} 에러 발생` : '에러 발생'}
        </Message>
      )}
      {isLoading && !error && <Message color="black">로딩 중...</Message>}
    </LoadingWrapper>
  );
};

export default Loading;