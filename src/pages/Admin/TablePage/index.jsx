import TableHeader from './TableHeader';
import DataTable from './Table';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 40px; /* 전체적으로 마진을 줍니다. */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  flex-direction: column; /* 자식 컴포넌트들을 세로로 정렬 */
`;

export default function TablePage(props) {
  return (
    <>
      <TableHeader
        data={props.data}
        TableName={props.TableName}
        startDate={props.startDate}
        setStartDate={props.setStartDate}
        endDate={props.endDate}
        setEndDate={props.setEndDate}
      />
      <TableContainer>
        <DataTable
          data={props.data}
          startDate={props.startDate}
          setStartDate={props.setStartDate}
          endDate={props.endDate}
          setEndDate={props.setEndDate}
        />
      </TableContainer>
    </>
  );
}
