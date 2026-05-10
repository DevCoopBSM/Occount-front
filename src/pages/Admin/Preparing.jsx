import React from 'react';
import * as N from '../../common/PageWrapStyle';

export default function Preparing() {
  return (
    <N.PreWrap>
      <img src="/assets/PreparingLogo.svg" width={'400px'} height={'200px'} alt="Preparing" />
      <N.PreTitle>서비스 준비중입니다!</N.PreTitle>
      <N.PreContent>
        이용에 불편을 드려 죄송합니다.
        <br />
        보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.
        <br />
        빠른 시일내에 준비하여 찾아 뵙겠습니다.
      </N.PreContent>
      <N.HomeButton to="/">홈으로</N.HomeButton>
    </N.PreWrap>
  );
}
