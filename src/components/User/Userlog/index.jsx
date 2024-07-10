import React from "react";
import UserLogItem from "./UserLogItem";
import { useUser } from "hooks/getUserInfo";
import { color } from "constants/color";
import * as _ from "./style";

export const Userlog = () => {
  const { user } = useUser();
  const formatPoint = user.point.toLocaleString();
  return (
    <_.CompeleteWrap>
      <_.ExChangeDetailWrap width={"900px"} paddingTop={"10px"}>
        <_.InfoText color={color.default}>남은금액</_.InfoText>
        <_.Exchange fontSize={"30px"} fontWeight={"700"}>
          {formatPoint}원
        </_.Exchange>
      </_.ExChangeDetailWrap>

      <_.UseLogWrap style={{flexDirection: "column"}}>
        <_.InfoText>사용내역</_.InfoText>
        
          <_.PointContainer>
            <_.rightWrap>
              <li style={{display: "flex"}}>
                <UserLogItem type={0}/>
              </li>
            </_.rightWrap>
            <_.leftWrap>
              <li style={{display: "flex"}}>
                <UserLogItem type={1}/>
              </li>
            </_.leftWrap>
          </_.PointContainer>

      </_.UseLogWrap>
    </_.CompeleteWrap>
  );
};
