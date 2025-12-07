import styled from 'styled-components';

export const NoticePageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: white;

  // 헤더와 푸터를 고려한 패딩 (헤더가 없다면 제거해도 됨)
  padding-top: clamp(20px, 3.13vw, 60px); // 60px / 1920px = 3.13%
  padding-bottom: clamp(40px, 6.25vw, 120px); // 120px / 1920px = 6.25%

  @media (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 40px;
  }
`;