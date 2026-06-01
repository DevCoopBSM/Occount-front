import * as _ from './style';
import DatePicker from 'react-datepicker';
import * as xlsx from 'xlsx';

const TableHeader = ({ startDate, setStartDate, endDate, setEndDate, data, TableName }) => {
  const handleDownload = () => {
    const workbook = xlsx.utils.book_new(); // 새로운 워크북 생성
    const worksheet = xlsx.utils.json_to_sheet(data); // 데이터를 시트로 변환
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // 시트를 워크북에 추가
    const excelBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    }); // 워크북을 버퍼로 변환

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'excel_file.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <>
      <_.InfoHeader>
        <_.Infotitle>{TableName}</_.Infotitle>
        <_.StyledDatePickerWrapper>
          {startDate !== undefined && ( // startDate가 null이 아닌 경우에만 아래 부분 렌더링
            <>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
              />
              <_.Infotext>00시 부터</_.Infotext>
            </>
          )}
          {endDate !== undefined && (
            <>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
              />
              <_.Infotext>24시 까지</_.Infotext>
            </>
          )}
        </_.StyledDatePickerWrapper>
        <_.ButtonContainer>
          <_.Dbutton onClick={handleDownload}>출력</_.Dbutton>
        </_.ButtonContainer>
      </_.InfoHeader>
    </>
  );
};
export default TableHeader;
