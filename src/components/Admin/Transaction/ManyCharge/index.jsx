import React, { useState, useEffect } from 'react';
import * as _ from './style';
import * as P from 'common/PageWrapStyle';
import { ManyChargeItem } from './ManyChargeItem';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FilterIcon } from 'assets/FilterIcon.svg';
import axiosInstance from 'utils/Axios';
import StudentCharge from './ChargeModal';

const ManyCharge = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentIdSearchTerm, setStudentIdSearchTerm] = useState('');
  const [allStudents, setAllStudents] = useState([]);
  const navigate = useNavigate();

  const toggleStudentSelection = (stuCode) => {
    setSelectedStudents((prevSelected) => {
      const newSelected = prevSelected.includes(stuCode)
        ? prevSelected.filter((code) => code !== stuCode)
        : [...prevSelected, stuCode];
      console.log('Updated selectedStudents:', newSelected);
      return newSelected;
    });
  };

  const handleSelectAll = (allStudentIds) => {
    if (selectedStudents.length === allStudentIds.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(allStudentIds);
    }
  };

  const handleNavigateToBarcode = () => {
    navigate('/admin/barcode');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStudentIdSearchChange = (event) => {
    setStudentIdSearchTerm(event.target.value);
  };

  useEffect(() => {
    axiosInstance
      .get('v2/account/student/list')
      .then((response) => {
        if (response.data && Array.isArray(response.data.studentList)) {
          const validStudents = response.data.studentList.filter(
            (student) => student.stuNumber // 학번이 null이 아닌 학생만 포함
          );
          setAllStudents(validStudents); // 전체 학생 목록을 저장
        } else {
          console.error('Expected studentList array, but received:', response.data);
          setAllStudents([]); // 데이터가 예상한 형식이 아닌 경우 빈 배열로 설정
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredStudents = allStudents.filter(
    (student) =>
      (!searchTerm || student.stuName.includes(searchTerm)) &&
      (!studentIdSearchTerm || student.stuNumber.startsWith(studentIdSearchTerm))
  );

  return (
    <>
      <P.InfoContainer>
        <P.InfoHeader>
          <_.Infotitle>일괄 충전</_.Infotitle>
          <_.ButtonContainer>
            <_.Barcode onClick={handleNavigateToBarcode} />
            <StudentCharge
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
            />
          </_.ButtonContainer>
        </P.InfoHeader>

        <_.Infolist>
          <_.Infosearch>
            <_.InfoInput
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="이름 검색"
            />
            <_.InfoInput
              value={studentIdSearchTerm}
              onChange={handleStudentIdSearchChange}
              placeholder="학번 검색"
            />
            <_.Inputbutton>{/* <SearchIcon /> */}</_.Inputbutton>
            <_.Filter>
              <FilterIcon />
            </_.Filter>
          </_.Infosearch>

          <ManyChargeItem
            students={filteredStudents}
            onToggleStudentSelection={toggleStudentSelection}
            selectedStudents={selectedStudents}
            onSelectAll={handleSelectAll} // 전체 선택 기능을 추가합니다.
          />
        </_.Infolist>
      </P.InfoContainer>
    </>
  );
};

export default ManyCharge;
