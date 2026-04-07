import styled from 'styled-components';

// 공통 컨테이너 컴포넌트 - 헤더와 동일한 너비/패딩 사용
export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 34px 180px 100px;
  min-height: calc(100vh - 200px);

  @media (max-width: 1560px) {
    padding: 34px 80px 100px;
  }

  @media (max-width: 1200px) {
    padding: 34px 40px 100px;
  }

  @media (max-width: 768px) {
    padding: 34px 20px 100px;
  }
`;

// 일반적인 페이지 컨테이너
export const PageContentContainer = styled(ContentContainer)`
  min-height: calc(100vh - 160px);
  background-color: #fff;
`;

// 관리자 페이지 컨테이너
export const AdminContentContainer = styled(ContentContainer)`
  min-height: calc(100vh - 180px);
  background-color: #fff;
  padding-top: 40px;
`;