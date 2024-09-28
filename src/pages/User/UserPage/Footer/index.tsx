import React from 'react';
import * as S from './style';

const Footer: React.FC = () => {
  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <S.FooterLine>상호: 부산소마고 사회적협동조합 | 대표: 김민경(이사장) | 사업자 등록번호: 214-82-16238</S.FooterLine>
        <S.FooterLine>주소: 부산광역시 강서구 가락대로 1393 부산소프트웨어마이스터고 융합관 공간-아리소리</S.FooterLine>
        <S.FooterLine>전화번호: 051-970-1709</S.FooterLine>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;