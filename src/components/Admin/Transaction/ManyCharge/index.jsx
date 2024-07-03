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
  const [filteredStudents, setFilteredStudents] = useState([]);
  const movePage = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStudentIdSearchChange = (event) => {
    setStudentIdSearchTerm(event.target.value);
  };

  const toggleStudentSelection = (studentId) => {
    const isSelected = selectedStudents.includes(studentId);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      const allStudentIds = filteredStudents.map(student => student.code_number);
      setSelectedStudents(allStudentIds);
    }
  };

  useEffect(() => {
    axiosInstance
      .get('/admin/userlist')
      .then((response) => {
        setAllStudents(response.data);
        setFilteredStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const filtered = allStudents.filter(student =>
      student.student_name.includes(searchTerm) &&
      student.student_id?.startsWith(studentIdSearchTerm)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, studentIdSearchTerm, allStudents]);

  function barcode() {
    movePage('/admin/barcode');
  }

  return (
    <>
      <P.InfoContainer>
        <P.InfoHeader>
          <_.Infotitle>학생 정보 조회</_.Infotitle>
          <_.ButtonContainer>
            <_.Barcode onClick={barcode}></_.Barcode>
            <_.Infobutton onClick={handleSelectAll} mRight="10px">
              전체선택
            </_.Infobutton>
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
          <_.Info>
            <_.Infochoose>
              <_.Infotext>선택</_.Infotext>
            </_.Infochoose>
            <_.Infochoose>
              <_.Infotext>학번</_.Infotext>
            </_.Infochoose>
            <_.Infochoose>
              <_.Infotext>이름</_.Infotext>
            </_.Infochoose>
            <_.Infochoose>
              <_.Infotext>바코드번호</_.Infotext>
            </_.Infochoose>
          </_.Info>
          <div>
            <ManyChargeItem
              onToggleStudentSelection={toggleStudentSelection}
              selectedStudents={selectedStudents}
              searchTerm={searchTerm}
              studentIdSearchTerm={studentIdSearchTerm}
            />
          </div>
        </_.Infolist>
      </P.InfoContainer>
    </>
  );
};

export default ManyCharge;
