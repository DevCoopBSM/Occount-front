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
`;

export const ScrollButtons = styled.div`
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000; /* 스크롤 버튼이 다른 요소 위에 표시되도록 설정 */
`;

export const ScrollButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #ddd;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f9f9f9;
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
  justify-content: center; /* 추가된 부분 */
  margin-top: 300px;
  margin-bottom: 30px;
  width: 90%;
`;

export const TextBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 60%;
  text-align: center;
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  width: 40%;
  margin-right: 50px; 
  margin-left: 50px;
`;

export const GuideImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 50%;
  margin-right: 50px; 
  margin-left: 50px;
`;


export const Text1 = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  align-items: center;

  span {
    font-size: 44px;
    font-weight: 900;
  }
`;

export const LTText1 = styled.div`
  margin-top: 200px;
  color: #333;
  text-align: center;
  align-items: center;
  padding-bottom: 300px;
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
`;

export const Button = styled.button`
  display: inline-flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: 900;
  background: #FFC20C;
  border: none;
  cursor: pointer; 
  font-size: 20px;
`;

export const FooterText = styled.p`
  margin: 0;
  text-align: center;
`;
