import React from 'react';
import NoticeList from 'components/User/UserMain/Notice/NoticeList';
import * as S from './style';

const NoticePage: React.FC = () => {
  return (
    <S.CompeleteWrap>
      <NoticeList />
    </S.CompeleteWrap>
  );
};

export default NoticePage;