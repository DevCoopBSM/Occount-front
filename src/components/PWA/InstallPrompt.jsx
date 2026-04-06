import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // PWA 설치 가능 이벤트 리스너
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    // PWA 설치 완료 이벤트 리스너
    const handleAppInstalled = () => {
      console.log('오카운트 PWA 설치됨');
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    // 이미 설치되어 있는지 확인
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      setShowInstallBanner(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
          console.log('사용자가 PWA 설치 승인');
        } else {
          console.log('사용자가 PWA 설치 거부');
        }

        setDeferredPrompt(null);
        setShowInstallBanner(false);
      } catch (error) {
        console.error('PWA 설치 프롬프트 에러:', error);
      }
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);

    // 7일 후에 다시 표시
    const dismissTime = new Date().getTime();
    localStorage.setItem('pwa-install-dismissed', dismissTime);
  };

  // 이전에 거부했는지 확인 (7일 이내)
  const wasDismissedRecently = () => {
    const dismissTime = localStorage.getItem('pwa-install-dismissed');
    if (dismissTime) {
      const daysSinceDismiss =
        (new Date().getTime() - parseInt(dismissTime)) / (1000 * 60 * 60 * 24);
      return daysSinceDismiss < 7;
    }
    return false;
  };

  // 설치 배너 표시 조건
  if (!showInstallBanner || isInstalled || wasDismissedRecently()) {
    return null;
  }

  return (
    <Banner>
      <LeftContent>
        <IconWrapper>
          <IconImage src="/icon-512.png" alt="오카운트 앱 아이콘" />
        </IconWrapper>
        <TextContent>
          <Title>앱으로 더 편하게 이용해보세요! 😉</Title>
          <Description>
            더 빠른 접속과 함께 앱과 같은 경험을 제공합니다.
          </Description>
        </TextContent>
      </LeftContent>

      <ButtonGroup>
        <DismissButton onClick={handleDismiss}>나중에</DismissButton>
        <InstallButton onClick={handleInstallClick}>설치하기</InstallButton>
      </ButtonGroup>
    </Banner>
  );
};

const IconImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
`;

// 스타일 컴포넌트
const Banner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 30px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  max-width: calc(100vw - 40px);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    bottom: 16px;
    padding: 20px;
    flex-direction: column;
    gap: 16px;
    max-width: calc(100vw - 32px);
    width: auto;
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const IconWrapper = styled.div`
  width: 84px;
  height: 84px;
  background: #fcc800;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #484848;
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: black;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Description = styled.p`
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #484848;
  line-height: 1.3;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 14px;
    white-space: normal;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 12px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: scale(0.98);
  }
`;

const DismissButton = styled(BaseButton)`
  background: transparent;
  color: #666;
  font-size: 13px;
  padding: 10px 14px;

  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const InstallButton = styled(BaseButton)`
  background: #fcc800;
  color: black;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 18px;

  &:hover {
    background: #e6b500;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

export default InstallPrompt;
