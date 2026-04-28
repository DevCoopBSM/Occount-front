import styled, { css } from 'styled-components';

const fontStyles = css`
  @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
  font-family: 'NanumSquare', sans-serif;
`;

export const HowToContainer = styled.div`
  ${fontStyles}
  position: relative;
  min-height: 100vh;
  background: #ffffff;
`;

// 사이드 네비게이션
export const SideNavigation = styled.nav`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    right: 15px;
    gap: 10px;
  }
`;

export const NavItem = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #FCC800;
  border-radius: 50px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
  overflow: hidden;

  &:hover {
    background: #FCC800;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(252, 200, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    min-width: 100px;
  }
`;

export const NavIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const NavLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// 히어로 섹션
export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
  text-align: center;
  padding: 80px 20px;
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroLogo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 80px;
    margin-bottom: 20px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.2;
`;

export const BrandName = styled.span`
  color: #FCC800;
  font-weight: 900;
`;

export const HeroDescription = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  color: #666;
  margin: 0 0 40px 0;
  line-height: 1.6;
`;

// 섹션 스타일
export const Section = styled.section`
  padding: 80px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 60px 0;
    min-height: 80vh;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const CharacterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 15px;
    margin-bottom: 20px;
  }
`;

export const CharacterIcon = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  cursor: pointer;
  animation: ${props => props.$isRotating ? 'spinOnce 0.8s ease-out' : 'none'};

  @keyframes spinOnce {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const Firework = styled.span`
  font-size: 48px;
  animation: pulse 1s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
`;

export const SectionDescription = styled.p`
  font-size: clamp(16px, 2.5vw, 18px);
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

// 기능 카드 그리드
export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const FeatureCard = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const FeatureIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Header가 다른 요소 위에 표시되도록 설정 */
`;

export const LogoImg = styled.img`
  cursor: pointer;
  width: 5%;

  @media (max-width: 768px) {
    width: 20%; /* 작은 화면에서 로고 크기를 줄임 */
  }
`;

export const ScrollButtons = styled.div`
  position: fixed;
  top: 50%;
  left: 10px; /* 왼쪽에 위치하도록 변경 */
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000; /* 스크롤 버튼이 다른 요소 위에 표시되도록 설정 */

  @media (max-width: 768px) {
    left: 5px; /* 작은 화면에서 스크롤 버튼 위치 조정 */
  }
`;

export const ScrollButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: clamp(12px, 1.5vw, 16px); /* 반응형으로 글꼴 크기 조정 */
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ddd;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 35px;
  }
`;


export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap; /* 반응형으로 요소들이 자동 줄바꿈 되도록 설정 */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ImageTextBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
  width: 90%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 60%;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  width: 40%;
  margin-right: 50px;
  margin-left: 50px;

  @media (max-width: 768px) {
    width: 80%;
    margin: 20px 0;
  }
`;

export const GuideImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 50%;
  margin-right: 50px; 
  margin-left: 50px;

  @media (max-width: 768px) {
    width: 80%; /* 작은 화면에서는 이미지 크기를 줄임 */
    margin: 20px 0; /* 상하 여백 조정 */
  }
`;

export const Text1 = styled.div`
  font-size: clamp(18px, 2.5vw, 28px); /* 최소 18px, 최대 28px으로 반응형 조정 */
  font-weight: 700;
  color: #333;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: clamp(24px, 4vw, 44px); /* 최소 24px, 최대 44px으로 반응형 조정 */
    font-weight: 900;
  }
`;

export const LTText1 = styled.div`
  margin-top: 200px;
  color: #333;
  text-align: center;
  align-items: center;
  padding-bottom: 300px;
  font-size: clamp(14px, 2vw, 18px); /* 최소 14px, 최대 18px으로 반응형 조정 */

  @media (max-width: 768px) {
    margin-top: 100px;
    padding-bottom: 150px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: #999;
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;

  @media (max-width: 768px) {
    height: 100px; /* 작은 화면에서는 푸터 높이를 줄임 */
    padding: 10px;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: 900;
  background: #ffc20c;
  border: none;
  cursor: pointer;
  font-size: clamp(16px, 2.5vw, 20px); /* 반응형으로 글꼴 크기 조정 */

  @media (max-width: 768px) {
    font-size: 16px;
    height: 40px;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  text-align: center;
  font-size: clamp(12px, 2vw, 16px); /* 최소 12px, 최대 16px 사이에서 변화 */

  @media (max-width: 768px) {
    font-size: clamp(10px, 1.5vw, 14px); /* 더 작은 화면에서는 크기 추가 조정 */
  }
`;

// 단계별 가이드 스타일
export const StepContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const StepItem = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const StepNumber = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: #FCC800;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

export const StepImage = styled.img`
  width: 100%;
  max-width: ${props => props.large ? '400px' : '250px'};
  height: auto;
  margin: 20px 0;
  border-radius: 8px;
`;

export const StepDescription = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 0;
`;

// 사용 방법 스타일
export const UsageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const UsageCard = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const UsageIcon = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
`;

export const UsageTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
`;

export const UsageDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

// CTA 섹션
export const CTASection = styled.section`
  background: linear-gradient(135deg, #FCC800 0%, #F49E15 100%);
  padding: 80px 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const CTALogo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 30px;
  filter: brightness(0);

  @media (max-width: 768px) {
    width: 70px;
    margin-bottom: 20px;
  }
`;

export const CTATitle = styled.h2`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: #333;
  margin: 0 0 40px 0;
`;

export const CTAButton = styled.button`
  background: ${props => props.primary ? '#333' : '#FCC800'};
  color: ${props => props.primary ? '#fff' : '#333'};
  border: none;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  min-width: 260px;
  margin-bottom: 30px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    background: ${props => props.primary ? '#555' : '#F49E15'};
  }

  @media (max-width: 768px) {
    padding: 14px 36px;
    font-size: 16px;
    min-width: 220px;
    margin-bottom: 20px;
  }
`;

export const CTATerms = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.5;
  margin: 0;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// 여백 섹션
export const SpacerSection = styled.section`
  background: #ffffff;
  padding: 60px 0;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

// 약관 섹션
export const TermsSection = styled.section`
  background: #f8f9fa;
  padding: 40px 20px;
  text-align: center;
`;

export const TermsContent = styled.p`
  max-width: 800px;
  margin: 0 auto;
  font-size: 14px;
  color: #666;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;