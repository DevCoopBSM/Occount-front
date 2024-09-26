import styled, { css } from 'styled-components';

const fontStyles = css`
  @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
  font-family: 'NanumSquare', sans-serif;
`;

export const HowToContainer = styled.div`
  ${fontStyles}
  position: relative;
  padding-top: 60px; /* Header 높이만큼 패딩 추가 */
  min-height: 100vh; /* 페이지가 화면 전체 높이를 차지하도록 설정 */
  padding: 20px;
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
  background-color: #f9f9f9;
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