import React from 'react';
import * as _ from './style';
import styled from 'styled-components';

export const ManyChargeItem = ({
  students,
  selectedStudents,
  onToggleStudentSelection,
  onSelectAll,
}) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    onToggleStudentSelection(name);
  };

  const handleSelectAllChange = () => {
    const allStudentIds = students.map((student) => student.stuCode);
    onSelectAll(allStudentIds);
  };

  return (
    <>
      <InfoWrap>
        <_.Info>
          <_.Infochoose>
            <input
              type="checkbox"
              onChange={handleSelectAllChange}
              checked={selectedStudents.length === students.length}
            />
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
        {students.map((student, index) => (
          <_.Info key={index}>
            <_.Infochoose>
              <input
                type="checkbox"
                name={student.stuCode}
                checked={selectedStudents.includes(student.stuCode)}
                onChange={handleCheckboxChange}
              />
            </_.Infochoose>
            <_.Infochoose>
              <_.Infotext>{student.stuNumber || 'N/A'}</_.Infotext> {/* 학번이 없는 경우 "N/A"로 표시 */}
            </_.Infochoose>
            <_.Infochoose>
              <_.Infotext>{student.stuName}</_.Infotext>
            </_.Infochoose>
            <_.Infochoose>
              <_.Infotext>{student.stuCode}</_.Infotext>
            </_.Infochoose>
          </_.Info>
        ))}
      </InfoWrap>
    </>
  );
};

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  flex-direction: column;
`;
