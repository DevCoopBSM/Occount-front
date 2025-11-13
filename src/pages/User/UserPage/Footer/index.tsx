import React from 'react';
import * as S from './style';

const Footer: React.FC = () => {
  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <S.FooterInfo>
          <p>상호: 부산소프트웨어마이스터고등학교 </p>
          <p>사회적협동조합대표: 김민경(이사장)</p>
          <p>사업자 등록번호: 214-82-16238</p>
          <p>주소: 부산광역시 강서구 가락대로 1393 부산소프트웨어마이스터고 융합관 공간-아리소리</p>
          <p>전화번호: 051-970-1709</p>
        </S.FooterInfo>
        <S.FooterSocial>INSTA | GITHUB</S.FooterSocial>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;