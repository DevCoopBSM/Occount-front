import React from 'react';
import Main from 'components/User/UserMain';
import UserHeader from 'components/User/UserHeader';
import * as P from 'common/PageWrapStyle';

export default function MainPage() {
  return (
    <>
      <P.PageWrap>
        <P.PageContainer>
          <UserHeader />
          <Main />
          {/* <footer style={{ textAlign: 'center', marginTop: '20px', padding: '10px 0' }}>
            <p>
              <span style={{ marginRight: '20px' }}>상호: 부산소마고 사회적협동조합</span>
              <span style={{ marginRight: '20px' }}>대표: 김민경(이사장)</span>
              <span>사업자 등록번호: 214-82-16238</span>
            </p>
            <p>주소: 부산광역시 강서구 가락대로 1393 부산소프트웨어마이스터고 융합관 공간-아리소리</p>
            <p>전화번호: 051-970-1709</p>
          </footer> */}
        </P.PageContainer>
      </P.PageWrap>
    </>
  );
}
