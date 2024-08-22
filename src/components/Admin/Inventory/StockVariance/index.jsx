import React, { useEffect, useState } from 'react';
import * as _ from './style';
import * as P from 'common/PageWrapStyle';
import { useNavigate } from 'react-router-dom';
import { StockVarianceItem } from './StockVarianceItem';
import DatePicker from 'react-datepicker';
import axiosInstance from 'utils/Axios';

const StockVariance = () => {
  const movePage = useNavigate();

  const [startDate, setStartDate] = useState(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
  );
  const [endDate, setEndDate] = useState(
    new Date(
      Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0)
    )
  );

  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [data, setData] = useState([]);

  // 월초부터 월말까지 기본 조회
  useEffect(() => {
    handleSearch();
  }, [startDate, endDate]);

  const handleSearch = () => {
    const queryParams = `?start_date=${
      startDate.toISOString().split('T')[0]
    }&end_date=${endDate.toISOString().split('T')[0]}`;

    axiosInstance
      .get(`v2/admin/stockVariance${queryParams}`)
      .then((response) => {
        if (response.status === 204) {
          // 사용자에게 데이터가 없음을 알리고, data 상태를 빈 배열로 설정합니다.
          console.log('No content');
          setData([]);
        } else {
          // 그렇지 않으면 정상적으로 데이터를 상태에 설정합니다
          console.log('Data sent:', response.data);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const handleDownload = () => {
    const queryParams = `?start_date=${
      startDate.toISOString().split('T')[0]
    }&end_date=${endDate.toISOString().split('T')[0]}`;

    axiosInstance({
      method: 'get',
      url: `v2/admin/inventoryCheck${queryParams}`,
      responseType: 'blob',
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'excel_file.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('엑셀 파일로 다운로드를 했습니다');
      })
      .catch((error) => {
        console.error('엑셀 파일 다운로드 중 오류 발생:', error);
      });
  };

  function main() {
    movePage('/admin');
  }

  return (
    <>
      <P.InfoContainer>
        <_.InfoHeader>
          <_.Infotitle>기간별재고변동</_.Infotitle>
        </_.InfoHeader>
        <_.FlexRow>
          <_.StyledDatePickerWrapper>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
            />
            <_.Infotext>부터</_.Infotext>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
            />
            <_.Infotext>까지 재고변동 취합 </_.Infotext>
          </_.StyledDatePickerWrapper>
          <_.ButtonContainer>
            {/* <_.Dbutton onClick={handleSearch}>조회</_.Dbutton> */}
            <_.Dbutton onClick={handleDownload}>출력</_.Dbutton>
            <_.Dbutton onClick={main}>메인으로</_.Dbutton>
          </_.ButtonContainer>
        </_.FlexRow>

        <_.Infolist>
          <_.Info>
            <_.Infochoose>
              <_.Infotext>상품번호</_.Infotext>
            </_.Infochoose>
            <_.Infochooses>
              <_.Infotext>상품이름</_.Infotext>
            </_.Infochooses>
            <_.Infochoose>
              <_.Infotext>변동수량</_.Infotext>
            </_.Infochoose>
            <_.Infochooses>
              <_.Infotext>최종 변동 일시</_.Infotext>
              <_.FilterImg
                onClick={() => setIsEndDateVisible(!isEndDateVisible)}
                style={{ cursor: 'pointer', marginRight: '5px' }}
              />
            </_.Infochooses>
          </_.Info>
          <_.StockInfoWrap>
            {
              <_.StockInfoWrap>
                {data.map((item) => (
                  <StockVarianceItem key={item.item_id} stockVariance={item} />
                ))}
              </_.StockInfoWrap>
            }
          </_.StockInfoWrap>
        </_.Infolist>
      </P.InfoContainer>
    </>
  );
};

export default StockVariance;
