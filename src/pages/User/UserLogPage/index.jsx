import React from "react";
import { UserLog } from "components/User/UserLog";
import UserHeader from "components/User/UserHeader";
import * as P from "common/PageWrapStyle";

export default function UserlogPage() {
  return (
    <P.PageWrap>
      <P.PageContainer>
        <UserHeader />
        <UserLog />
      </P.PageContainer>
    </P.PageWrap>
  );
}
