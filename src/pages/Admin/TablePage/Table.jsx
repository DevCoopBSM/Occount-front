import styled, { css } from 'styled-components';

// 미디어 쿼리를 위한 유틸리티 함수
const media = {
  desktop: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
};

// 스타일 컴포넌트 정의
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  text-align: center; /* 셀 내용을 가운데 정렬 */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  ${media.desktop`
    box-shadow: none; // 데스크탑에서는 그림자를 제거
    border-radius: 0; // 데스크탑에서는 테이블 둥근 모서리를 제거
  `}

  ${media.tablet`
    font-size: 14px; // 태블릿에서는 글자 크기를 줄임
  `}
`;

// 나머지 스타일 컴포넌트도 동일한 방식으로 미디어 쿼리를 적용할 수 있습니다.
const StyledThead = styled.thead`
  background-color: #34343c; // 테이블 헤더 배경색

  ${media.tablet`
    // 태블릿에서는 헤더 배경색을 변경
    background-color: #2c2c2c;
  `}
`;

const StyledTh = styled.th`
  padding: 16px;
  font-size: 20px;
  color: white; // 테이블 헤더 글자색
  font-weight: bold;

  ${media.tablet`
    padding: 8px; // 태블릿에서는 패딩을 줄임
  `}
`;

const StyledTbody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #fafafa; /* 홀수 행 배경색 */
  }
  tr:nth-child(even) {
    background-color: #efefef; /* 짝수 행 배경색 */
  }
  tr:hover {
    background-color: #f7bd4c; /* 마우스 오버 시 배경색 */
  }
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eaeaea;
`;

// 데이터 테이블 컴포넌트
const DataTable = ({ data }) => {
  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <StyledTable>
      <StyledThead>
        <tr>
          {headers.map((header, index) => (
            <StyledTh key={index}>{header}</StyledTh>
          ))}
        </tr>
      </StyledThead>
      <StyledTbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, columnIndex) => (
              <StyledTd key={`${rowIndex}-${columnIndex}`}>{row[header]}</StyledTd>
            ))}
          </tr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};

export default DataTable;
