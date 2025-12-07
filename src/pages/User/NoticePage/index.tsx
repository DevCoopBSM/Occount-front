import React from 'react';
import NoticeList from 'components/User/UserMain/Notice/NoticeList';
import * as S from './style';

const NoticePage: React.FC = () => {
  return (
    <S.NoticePageContainer>
      <NoticeList />
    </S.NoticePageContainer>
  );
};

export default NoticePage;