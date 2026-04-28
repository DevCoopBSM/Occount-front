import React from 'react';
import * as N from 'common/PageWrapStyle';

export default function NotFoundPage() {
  return (
    <N.NotFoundWrap>
      <img src="/assets/404AriPayC.svg" width={'400px'} height={'200px'} alt="404 Not Found" />
      <N.NotFoundTitle>
        죄송합니다. 페이지를 찾을 수 없습니다 :{'('}{' '}
      </N.NotFoundTitle>
      <N.NotFoundContent>
        존재하지 않는 주소를 입력하셨거나
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </N.NotFoundContent>
      <N.HomeButton to="/">홈으로</N.HomeButton>
    </N.NotFoundWrap>
  );
}
