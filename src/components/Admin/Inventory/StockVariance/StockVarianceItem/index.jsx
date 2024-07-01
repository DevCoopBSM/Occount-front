import React, { useState, useEffect } from 'react';
import * as _ from './style';
import styled from 'styled-components';
import { PrettyDateTime } from 'utils/Date';

export const StockVarianceItem = ({ stockVariance }) => {
  return (
    <InfoWrap>
      <_.Info>
        <_.Infochoose>
          <_.Infotext>{stockVariance.item_id}</_.Infotext>
        </_.Infochoose>
        <_.Infochooses>
          <_.Infotext>{stockVariance.item_name}</_.Infotext>
        </_.Infochooses>
        <_.Infochoose>
          <_.Infotext>{stockVariance.total_negative_change}</_.Infotext>
        </_.Infochoose>
        <_.Infochoose>
          <_.Infotext>{stockVariance.total_change}</_.Infotext>
        </_.Infochoose>
        <_.Infochooses>
          <_.Infotext>{PrettyDateTime(stockVariance.last_updated)}</_.Infotext>
        </_.Infochooses>
      </_.Info>
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  flex-direction: column;
`;
