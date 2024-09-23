import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import * as S from './style';
import axiosInstance from 'utils/Axios';
import { useAuth } from 'context/authContext'; // authContext 가져오기

const StudentCharge = ({ selectedStudents, setSelectedStudents }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [chargedPoint, setChargedPoint] = useState('');
  const { user } = useAuth(); // authContext에서 user 정보 가져오기

  // 학생 정보를 가져오는 함수
  const fetchStudentsInfo = () => {
    if (selectedStudents.length) {
      console.log('Fetching info for selectedStudents:', selectedStudents);
      axiosInstance
        .get('v2/account/studentlist')
        .then((response) => {
          if (response.data && Array.isArray(response.data.studentList)) {
            const matchedStudents = response.data.studentList.filter((student) =>
              selectedStudents.includes(student.stuCode)
            );
            setStudentsInfo(matchedStudents);
          } else {
            console.error('Expected studentList array, but received:', response.data);
            setStudentsInfo([]); // 데이터가 예상한 형식이 아닌 경우 빈 배열로 설정
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const BulkCharge = async (userCodeList, chargedPoint) => {
    try {
      const validAmount = parseInt(chargedPoint, 10);
      if (isNaN(validAmount) || validAmount <= 0) {
        alert('올바른 금액을 입력해주세요 (자연수).');
        return null;
      }

      const response = await axiosInstance.post('v2/transaction/bulkcharge', {
        userCodeList,
        chargedPoint: validAmount,
      });

      console.log('충전 결과:', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchStudentsInfo();
  }, [selectedStudents]);

  const handlePointChange = (e) => {
    setChargedPoint(e.target.value);
  };

  const handleBulkChargeClick = async () => {
    try {
      const results = await BulkCharge(selectedStudents, chargedPoint);
      if (results && results.length > 0) {
        const resultMessages = results.map(
          (result) =>
            `학생 ${result.userCode}: 이전 포인트 ${result.beforePoint} -> 이후 포인트 ${result.afterPoint}`
        ).join('\n');
        alert(`충전 결과:\n${resultMessages}`);

        // 충전이 성공적으로 완료되면 체크박스를 해제
        setSelectedStudents([]);
      }
    } catch (error) {
      alert('충전 중 오류가 발생했습니다.');
    }
    setModalOpen(false);
  };

  const handleBulkModalClick = () => {
    if (selectedStudents.length === 0) {
      alert('학생을 선택해주세요');
      return;
    }
    fetchStudentsInfo();
    setModalOpen(true);
  };

  return (
    <>
      <S.Infobutton onClick={handleBulkModalClick}>일괄충전</S.Infobutton>
      <Modal isOpen={modalOpen}>
        <S.TitleWrap>
          <S.ContentTitle>
            선택한 학생들에게 포인트를 일괄 충전합니다.
          </S.ContentTitle>
        </S.TitleWrap>
        <S.StudentList>
          {studentsInfo.map((student) => (
            <S.StudentListItem key={student.stuCode}>
              학번: {student.stuNumber} - 이름: {student.stuName}
            </S.StudentListItem>
          ))}
        </S.StudentList>
        <S.String />
        <S.PointWrap>
          <S.PointInTop>
            <S.InfoText color="#8A8A8A">포인트</S.InfoText>
            <S.PointInput
              name="point"
              value={chargedPoint}
              onChange={handlePointChange}
            />
          </S.PointInTop>
          <S.PointBottom>
            <span>관리자: {user?.name}</span> {/* authContext에서 가져온 사용자 이름 사용 */}
          </S.PointBottom>
        </S.PointWrap>
        <S.BtnWrap>
          <button onClick={() => setModalOpen(false)}>취소</button>
          <button onClick={handleBulkChargeClick}>일괄충전</button>
        </S.BtnWrap>
      </Modal>
    </>
  );
};

export default StudentCharge;
