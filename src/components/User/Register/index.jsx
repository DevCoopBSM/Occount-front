import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import imgLogo from "assets/occregisterLogo.svg";
import { useAuth } from "contexts/authContext";
import * as R from "./style";

// UserType 열거형 정의
const UserType = {
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  TEACHER: 'TEACHER',
  OTHER: 'OTHER'
};

// 임시 본인인증 함수
const verifyUser = async () => {
  // 실제 구현에서는 이 부분에 본인인증 API 호출 로직이 들어갑니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        userName: "지금은 테스트 중입니다.",
        userPhone: "010-1234-5678",
        userBirthDate: "1990-01-01",
        userCiNumber: "abcdefghijklmnop1234567890",
      });
    }, 1000); // 1초 후에 결과 반환
  });
};

// 비밀번호 각 조건 검사 함수들
const isLengthValid = (password) => password.length >= 8;
const hasLowerCase = (password) => /[a-z]/.test(password);
const hasNumbers = (password) => /\d/.test(password);
const hasSpecialChar = (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

// 전체 비밀번호 유효성 검사
const isPasswordValid = (password) => {
  return isLengthValid(password) && hasLowerCase(password) && hasNumbers(password) && hasSpecialChar(password);
};

// 영문 포함 여부를 확인하는 함수 추가
const containsEnglish = (str) => /[a-zA-Z]/.test(str);

// 이메일 유효성 검사 함수 수정
const validateEmail = (email, userType) => {
  const [localPart] = email.split('@');
  if (userType === UserType.TEACHER && !containsEnglish(localPart)) {
    return "교사 계정이 아닙니다.";
  }
  if (userType === UserType.STUDENT && containsEnglish(localPart)) {
    return "학생 계정이 아닙니다.";
  }
  return "";
};

function Register() {
  const navigate = useNavigate();
  const { register, errorMessage } = useAuth();

  const [userType, setUserType] = useState(UserType.STUDENT);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    userAddress: "",
    userPin: "",
    userCode: "", // 학생증 바코드
  });
  const [isVerified, setIsVerified] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [emailPrefix, setEmailPrefix] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    lowerCase: false,
    number: false,
    specialChar: false
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  // 애니메이션 설정
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  // 비밀번호 확인 필드 애니메이션을 위한 스프링
  const confirmPasswordSpring = useSpring({
    opacity: formData.userPassword ? 1 : 0,
    height: formData.userPassword ? 'auto' : 0,
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
  }, [passwordMatch, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      
      // 이메일 처리 로직
      if (name === 'userEmail') {
        if (userType === UserType.STUDENT || userType === UserType.TEACHER) {
          setEmailPrefix(value);
          const fullEmail = `${value}@bssm.hs.kr`;
          newState.userEmail = fullEmail;
          
          // 이메일 유효성 검사 추가
          const emailError = validateEmail(fullEmail, userType);
          setErrors(prevErrors => {
            const newErrors = {
              ...prevErrors,
              userEmail: emailError
            };
            return newErrors;
          });
        } else {
          newState.userEmail = value;
        }
      }
      
      // 비밀번호 관련 로직
      if (name === 'userPassword' || name === 'confirmPassword') {
        const password = name === 'userPassword' ? value : newState.userPassword;
        const confirmPassword = name === 'confirmPassword' ? value : newState.confirmPassword;
        
        setPasswordMatch(password === confirmPassword && password !== '');

        if (name === 'userPassword') {
          setPasswordErrors({
            length: !isLengthValid(value),
            lowerCase: !hasLowerCase(value),
            number: !hasNumbers(value),
            specialChar: !hasSpecialChar(value)
          });
        }
      }
      

      return newState;
    });
  };

  const handleVerification = async () => {
    try {
      const result = await verifyUser();
      if (result.success) {
        setIsVerified(true);
        setUserInfo({
          name: result.userName,
          birthDate: result.userBirthDate, // 가정: API가 이 정보를 반환한다고 가정
          phone: result.userPhone
        });
        alert("본인인증이 완료되었습니다.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("본인인증에 실패했습니다.");
    }
  };

  const openAddressSearch = () => {
    if (!isScriptLoaded) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    
    new window.daum.Postcode({
      oncomplete: function(data) {
        setFormData(prevState => ({
          ...prevState,
          userAddress: data.roadAddress
        }));
        setAddressDetail("");
      }
    }).open();
  };

  const handleAddressDetailChange = (e) => {
    setAddressDetail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("본인인증을 먼저 완료해주세요.");
      return;
    }
    if (formData.userPassword !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.userPin.length < 4) {
      alert("PIN 번호는 4자리 이상이어야 합니다.");
      return;
    }
    try {
      const result = await register({
        ...formData,
        userAddress: `${formData.userAddress} ${addressDetail}`.trim(),
        userType, // UserType 열거형 값 전달
      });
      if (result.success) {
        alert("회원가입이 완료되었습니다.");
        navigate('/');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Register component error:", error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    switch(currentStep) {
      case 1:
        if (!userType) {
          newErrors.userType = "사용자 유형을 선택해주세요.";
        }
        break;
      case 2:
        if (!isVerified) {
          newErrors.verification = "본인인증을 완료해주세요.";
        }
        break;
      case 3:
        if (userType === UserType.STUDENT || userType === UserType.TEACHER) {
          if (!emailPrefix) {
            newErrors.userEmail = "이메일 아이디를 입력해주세요.";
          }
        } else if (!formData.userEmail) {
          newErrors.userEmail = "이메일을 입력해주세요.";
        }
        if (!formData.userPassword) {
          newErrors.userPassword = "비밀번호를 입력해주세요.";
        } else if (!isPasswordValid(formData.userPassword)) {
          newErrors.userPassword = "비밀번호는 8자 이상이며, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.";
        }
        if (formData.userPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case 4:
        if (!formData.userAddress) {
          newErrors.userAddress = "주소를 입력해주세요.";
        }
        if (!formData.userPin || formData.userPin.length < 4) {
          newErrors.userPin = "PIN 번호는 4자리 이상이어 합니다.";
        }
        if (userType === UserType.STUDENT && !formData.userCode) {
          newErrors.userCode = "학생증 바코드를 입력해주세요.";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <R.AnimatedContainer style={fadeIn}>
            <R.StepTitle>사용자 유형 선택</R.StepTitle>
            <R.ToggleButtonContainer>
              <R.ToggleButton 
                active={userType === UserType.STUDENT}
                onClick={() => setUserType(UserType.STUDENT)}
              > 
                학생 
              </R.ToggleButton>
              <R.ToggleButton 
                active={userType === UserType.PARENT}
                onClick={() => setUserType(UserType.PARENT)}
              >
                학부모
              </R.ToggleButton>
              <R.ToggleButton 
                active={userType === UserType.TEACHER}
                onClick={() => setUserType(UserType.TEACHER)}
                type="button"
              >
                교사
              </R.ToggleButton>
            </R.ToggleButtonContainer>
            <R.ButtonContainer>
              <R.NavigationButton onClick={() => navigate('/')} isPrev>
                취소
              </R.NavigationButton>
              <R.NavigationButton onClick={nextStep}>
                다음
              </R.NavigationButton>
            </R.ButtonContainer>
          </R.AnimatedContainer>
        );
      case 2:
        return (
          <R.AnimatedContainer style={fadeIn}>
            <R.StepTitle>본인 인증</R.StepTitle>
            {isVerified && userInfo ? (
              <>
                <R.InputContainer>
                  <R.InputLabel>이름</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    value={userInfo.name}
                    disabled
                  />
                </R.InputContainer>
                <R.InputContainer>
                  <R.InputLabel>생년월일</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    value={userInfo.birthDate}
                    disabled
                  />
                </R.InputContainer>
                <R.InputContainer>
                  <R.InputLabel>핸드폰 번호</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    value={userInfo.phone}
                    disabled
                  />
                </R.InputContainer>
                <R.Button 
                  onClick={() => {
                    setIsVerified(false);
                    setUserInfo(null);
                  }}
                  style={{backgroundColor: '#F49E15', color: 'white', marginTop: '20px'}}
                >
                  재인증
                </R.Button>
              </>
            ) : (
              <R.Button 
                onClick={handleVerification} 
                disabled={isVerified}
                style={{backgroundColor: isVerified ? '#D9D9D9' : '#F49E15', color: isVerified ? '#333' : 'white'}}
              >
                {isVerified ? "본인인증 완료" : "본인인증"}
              </R.Button>
            )}
            <R.ButtonContainer>
              <R.NavigationButton onClick={prevStep} isPrev>
                이전
              </R.NavigationButton>
              <R.NavigationButton onClick={nextStep} disabled={!isVerified}>
                다음
              </R.NavigationButton>
            </R.ButtonContainer>
          </R.AnimatedContainer>
        );
      case 3:
        return (
          <R.AnimatedContainer style={fadeIn}>
            <R.StepTitle>계정 정보 입력</R.StepTitle>
            <R.InputContainer>
              <R.InputLabel>이메일</R.InputLabel>
              {userType === UserType.STUDENT || userType === UserType.TEACHER ? (
                <R.EmailContainer>
                  <R.EmailInput
                    type="text"
                    name="userEmail"
                    value={emailPrefix}
                    onChange={handleInputChange}
                    placeholder={userType === UserType.STUDENT ? "학생 학교 계정명" : "교사 학교 계정명"}
                    required
                  />
                  <R.EmailDomain>@bssm.hs.kr</R.EmailDomain>
                </R.EmailContainer>
              ) : (
                <R.RegisterInput
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력해주세요"
                  required
                />
              )}
              <R.ErrorMessage isVisible={!!errors.userEmail}>{errors.userEmail}</R.ErrorMessage>
            </R.InputContainer>
            <R.PasswordContainer>
              <R.InputContainer>
                <R.InputLabel>비밀번호</R.InputLabel>
                <R.RegisterInput
                  type="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  placeholder="8자 이상, 소문자, 숫자, 특수문자 포함"
                  required
                />
                <R.ErrorMessage isVisible={passwordErrors.length}>
                  비밀번호는 8자 이상이어야 합니다.
                </R.ErrorMessage>
                <R.ErrorMessage isVisible={passwordErrors.lowerCase}>
                  소문자를 포함해야 합니다.
                </R.ErrorMessage>
                <R.ErrorMessage isVisible={passwordErrors.number}>
                  숫자를 포함해야 합니다.
                </R.ErrorMessage>
                <R.ErrorMessage isVisible={passwordErrors.specialChar}>
                  특수문자를 포함해야 합니다.
                </R.ErrorMessage>
              </R.InputContainer>
              <animated.div style={confirmPasswordSpring}>
                <R.InputContainer>
                  <R.InputLabel>비밀번호 확인</R.InputLabel>
                  <R.RegisterInput
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 다시 입력해주세요"
                    required
                  />
                </R.InputContainer>
              </animated.div>
              {formData.confirmPassword && (
                passwordMatch ? (
                  <R.SuccessMessage isVisible={true}>
                    비밀번호가 일치합니다.
                  </R.SuccessMessage>
                ) : (
                  <R.ErrorMessage isVisible={true}>
                    비밀번호가 일치하지 않습니다.
                  </R.ErrorMessage>
                )
              )}
            </R.PasswordContainer>
            <R.ButtonContainer>
              <R.NavigationButton onClick={prevStep} isPrev>
                이전
              </R.NavigationButton>
              <R.NavigationButton onClick={nextStep}>
                다음
              </R.NavigationButton>
            </R.ButtonContainer>
          </R.AnimatedContainer>
        );
      case 4:
        return (
          <R.AnimatedContainer style={fadeIn}>
            <R.StepTitle>추가 정보 입력</R.StepTitle>
            <R.InputContainer>
              <R.InputLabel>주소</R.InputLabel>
              <R.RegisterInput
                type="text"
                name="userAddress"
                value={formData.userAddress}
                placeholder="주소를 검색해주세요"
                readOnly
                required
              />
              {errors.userAddress && (
                <R.ErrorMessage>
                  {errors.userAddress}
                </R.ErrorMessage>
              )}
            </R.InputContainer>
            <R.AddressSearchButton 
              type="button" 
              onClick={openAddressSearch} 
              disabled={!isScriptLoaded}
            >
              {isScriptLoaded ? "주소 검색" : "로딩 중..."}
            </R.AddressSearchButton>
            {formData.userAddress && (
              <>
                <R.InputContainer>
                  <R.InputLabel>상세 주소</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    name="addressDetail"
                    value={addressDetail}
                    onChange={handleAddressDetailChange}
                    placeholder="상세 주소를 입력해주세요"
                  />
                  {errors.addressDetail && (
                    <R.ErrorMessage>
                      {errors.addressDetail}
                    </R.ErrorMessage>
                  )}
                </R.InputContainer>
              </>
            )}
            <R.InputContainer>
              <R.InputLabel>PIN 번호 (4자리 이상)</R.InputLabel>
              <R.RegisterInput
                type="password"
                name="userPin"
                value={formData.userPin}
                onChange={handleInputChange}
                placeholder="4자리 이상의 PIN 번호를 입력해주세요"
                minLength="4"
                required
              />
              {errors.userPin && (
                <R.ErrorMessage>
                  {errors.userPin}
                </R.ErrorMessage>
              )}
            </R.InputContainer>
            {userType === UserType.STUDENT && (
              <>
                <R.InputContainer>
                  <R.InputLabel>학생증 바코드</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    name="userCode"
                    value={formData.userCode}
                    onChange={handleInputChange}
                    placeholder="학생증 바코드를 입력해주세요"
                    required
                  />
                  {errors.userCode && (
                    <R.ErrorMessage>
                      {errors.userCode}
                    </R.ErrorMessage>
                  )}
                </R.InputContainer>
              </>
            )}
            <R.ButtonContainer>
              <R.NavigationButton onClick={prevStep} isPrev>
                이전
              </R.NavigationButton>
              <R.NavigationButton onClick={handleSubmit}>
                회원가입
              </R.NavigationButton>
            </R.ButtonContainer>
          </R.AnimatedContainer>
        );
      default:
        return null;
    }
  };

  return (
    <R.Container>
      <R.LogoImg src={imgLogo} alt="logo" />
      <R.ContentContainer>
        {renderStep()}
      </R.ContentContainer>
      {errorMessage && (
        <R.ModalOverlay>
          <R.ModalContent>
            {errorMessage}
          </R.ModalContent>
        </R.ModalOverlay>
      )}
    </R.Container>
  );
}

export default Register;
