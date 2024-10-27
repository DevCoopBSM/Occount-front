import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import imgLogo from "assets/occregisterLogo.svg";
import axiosInstance from "utils/Axios";
import * as R from "./style";
import { UserType, FormData, ErrorState, UserInfo, RegisterRequest } from "./types";

declare global {
  interface Window {
    daum: any;
  }
}

const verifyUser = async (): Promise<{ success: boolean; userName: string; userPhone: string; userBirthDate: string; userCiNumber: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        userName: "지금은 테스트 중입니다.",
        userPhone: "010-1234-5678",
        userBirthDate: "1990-01-01",
        userCiNumber: "abcdefghijklmnop1234567890",
      });
    }, 1000);
  });
};

const isLengthValid = (password: string): boolean => password.length >= 8;
const hasLowerCase = (password: string): boolean => /[a-z]/.test(password);
const hasNumbers = (password: string): boolean => /\d/.test(password);
const hasSpecialChar = (password: string): boolean => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
const isPasswordValid = (password: string): boolean => 
  isLengthValid(password) && hasLowerCase(password) && hasNumbers(password) && hasSpecialChar(password);

const validateEmail = (email: string, userType: UserType): string => {
  const [localPart] = email.split('@');
  if (userType === UserType.TEACHER && !/[a-zA-Z]/.test(localPart)) {
    return "교사 계정이 아닙니다.";
  }
  if (userType === UserType.STUDENT && /[a-zA-Z]/.test(localPart)) {
    return "학생 계정이 아닙니다.";
  }
  return "";
};

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<UserType>(UserType.STUDENT);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userAddress: "",
    userPin: "",
    userCode: "",
    addressDetail: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [emailPrefix, setEmailPrefix] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    lowerCase: false,
    number: false,
    specialChar: false
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [pinMatch, setPinMatch] = useState(true);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isPrivacyCollectionAgreed, setIsPrivacyCollectionAgreed] = useState(false);
  const [isPrivacyThirdPartyAgreed, setIsPrivacyThirdPartyAgreed] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});

  const confirmPinSpring = useSpring({
    height: showConfirmPin ? 80 : 0,
    opacity: showConfirmPin ? 1 : 0,
    overflow: 'hidden',
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

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
    if (formData.userPin.length >= 4) {
      setShowConfirmPin(true);
    } else {
      setShowConfirmPin(false);
    }
  }, [formData.userPin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevState => {
      const newState = { ...prevState, [name]: value };
      
      if (name === 'userEmail') {
        if (userType === UserType.STUDENT || userType === UserType.TEACHER) {
          setEmailPrefix(value);
          const fullEmail = `${value}@bssm.hs.kr`;
          newState.userEmail = fullEmail;
          
          const emailError = validateEmail(fullEmail, userType);
          setErrors(prevErrors => ({ ...prevErrors, userEmail: emailError }));
        }
      }
      
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

      if (name === 'userPin' || name === 'confirmPin') {
        const pin = name === 'userPin' ? value : newState.userPin;
        const confirmPin = name === 'confirmPin' ? value : newState.confirmPin;
        
        setPinMatch(pin === confirmPin && pin !== '');
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
            userName: result.userName,
            userBirthDate: result.userBirthDate,
            userPhone: result.userPhone,
            userCiNumber: result.userCiNumber
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
      oncomplete: function(data: any) {
        setFormData(prevState => ({
          ...prevState,
          userAddress: data.roadAddress
        }));
        setAddressDetail("");
      }
    }).open();
  };

  const handleAddressDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert("본인인증을 먼저 완료해주세요.");
      return;
    }
    if (!isPrivacyCollectionAgreed || !isPrivacyThirdPartyAgreed) {
      setErrors(prevErrors => ({
        ...prevErrors,
        privacyAgreement: "모든 필수 약관에 동의해주세요"
      }));
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
    if (formData.userPin !== formData.confirmPin) {
      alert("PIN 번호가 일치하지 않습니다.");
      return;
    }
    try {
      const registerData: RegisterRequest = {
        ...formData,
        userAddress: `${formData.userAddress} ${addressDetail}`.trim(),
        userType,
        userName: userInfo.userName,
        userCiNumber: userInfo.userCiNumber,
        userPhone: userInfo.userPhone,
        userBirthDate: userInfo.userBirthDate
      };

      const response = await axiosInstance.post('/v2/auth/register', registerData);

      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate('/');
      } else {
        alert(response.data.message || "회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Register component error:", error);
      if (error.response) {
        alert(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
      } else {
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: ErrorState = {};
    switch(currentStep) {
      case 1:
        if (!userType) {
          newErrors.userType = "사용자 유형을 선택해주세요.";
        }
        break;
      case 2:
        if (!isPrivacyCollectionAgreed) {
          newErrors.privacyAgreement = "개인정보 수집 및 이용에 동의해주세요.";
        }
        if (!isPrivacyThirdPartyAgreed) {
          newErrors.privacyThirdParty = "개인정보 제3자 제공에 동의해주세요.";
        }
        break;
      case 3:
        if (!isVerified) {
          newErrors.verification = "본인인증을 완료해주세요.";
        }
        break;
      case 4:
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
      case 5:
        if (!formData.userAddress) {
          newErrors.userAddress = "주소를 입력해주세요.";
        }
        if (!formData.userPin || formData.userPin.length < 4) {
          newErrors.userPin = "PIN 번호는 4자리 이상이어야 합니다.";
        }
        if (formData.userPin !== formData.confirmPin) {
          newErrors.confirmPin = "PIN 번호가 일치하지 않습니다.";
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

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    
    setFormData(prevState => ({
      ...prevState,
      [name]: numericValue
    }));

    if (name === 'userPin') {
      setShowConfirmPin(numericValue.length >= 4);
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
            <R.StepTitle>개인정보 수집 및 이용 동의</R.StepTitle>
            <R.PrivacyContent>
              {/* 1. 처리하는 개인정보 항목 추가 */}
              <h3>1. 개인정보의 처리 목적 및 항목</h3>
              <table>
                <tr>
                  <th>구분</th>
                  <th>처리 목적</th>
                  <th>처리 항목</th>
                </tr>
                <tr>
                  <td>필수항목</td>
                  <td>
                    - 회원 가입 및 관리<br/>
                    - 매점 서비스 제공<br/>
                    - 본인 확인 및 인증<br/>
                    - 결제 서비스 제공
                  </td>
                  <td>
                    - 이름, 생년월일, 이메일<br/>
                    - 전화번호, 주소<br/>
                    - CI(연계정보)<br/>
                    - 학생의 경우: 학생증 바코드
                  </td>
                </tr>
                <tr>
                  <td>본인인증 시</td>
                  <td>- 본인 확인 및 인증</td>
                  <td>
                    - 이름, 생년월일, 성별<br/>
                    - 내/외국인 정보<br/>
                    - 휴대폰 번호<br/>
                    - CI/DI 정보
                  </td>
                </tr>
              </table>

              {/* 2. 보유기간 및 파기 */}
              <h3>2. 개인정보의 보유기간 및 파기</h3>
              <table>
                <tr>
                  <th>보유 기간</th>
                  <td>
                    회원 탈퇴 시 또는 조합원 자격 소실 시점으로부터 1년
                  </td>
                </tr>
                <tr>
                  <th>법령에 따른<br/>보관 의무</th>
                  <td>
                    - 전자상거래법: 거래기록 5년<br/>
                    - 통신비밀보호법: 로그기록 3개월
                  </td>
                </tr>
                <tr>
                  <th>파기 방법</th>
                  <td>
                    - 전자적 파일: 복구 불가능한 방법으로 영구 삭제<br/>
                    - 기타 기록물: 파 또는 소각
                  </td>
                </tr>
              </table>

              {/* 3. 제3자 제공 */}
              <h3>3. 개인정보 제3자 제공</h3>
              <table>
                <tr>
                  <th>제공받는 자</th>
                  <td>스마트로(주)</td>
                </tr>
                <tr>
                  <th>제공 목적</th>
                  <td>전자결제서비스 제공 및 결제도용 방지</td>
                </tr>
                <tr>
                  <th>제공 항목</th>
                  <td>이름, 전화번호, 결제정보</td>
                </tr>
                <tr>
                  <th>보유 기간</th>
                  <td>전자상거래법에 따른 보관 기간</td>
                </tr>
              </table>

              {/* 4. 처리위탁 */}
              <h3>4. 개인정보 처리위탁</h3>
              <table>
                <tr>
                  <th>수탁자</th>
                  <th>위탁 업무 내용</th>
                </tr>
                <tr>
                  <td>KG이니시스(주)</td>
                  <td>
                    - 본인확인(간편인증) 서비스<br/>
                    - 수집 항목: 이름, 생년월일, 성별, 내/외국인 정보, 휴대폰 번호, CI/DI 정보
                  </td>
                </tr>
                <tr>
                  <td>스마트로(주)</td>
                  <td>결제처리 서비스</td>
                </tr>
              </table>

              {/* 5. 이용자 권리 */}
              <h3>5. 정보주체의 권리·의무 및 행사방법</h3>
              <p>
                이용자는 다음과 같은 권리를 행사할 수 있습니다:<br/>
                - 개인정보 열람, 정정·삭제, 처리정지 요구<br/>
                - 개인정보 처리에 대한 동의 철회<br/>
                ※ 권리 행사는 홈페이지 내 설정 메뉴 또는 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하여 요청하실 수 있습니다.
              </p>

              {/* 6. 안전성 확보 조치 */}
              <h3>6. 개인정보의 안전성 확보 조치</h3>
              <p>
                회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다:<br/>
                - 개인정보 암호화: 비밀번호 등 중요정보는 암호화하여 보관<br/>
                - 해킹 등에 대비한 기술적 대책: 암호화 통신 사용, 접근통제 시스템 설치<br/>
                - 접근권한 관리: 개인정보처리시스템에 대한 접근권한 차등부여<br/>
                - 개인정보 취급자 최소화 및 교육 실시
              </p>

              {/* 7. 개인정보 보호책임자 */}
              <h3>7. 개인정보 보호책임자</h3>
              <table>
                <tr>
                  <th>이사장</th>
                  <td>김민경</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>이메일: wonching76@naver.com</td>
                </tr>
              </table>
            </R.PrivacyContent>

            <R.PrivacyNotice>
              <p>위 개인정보 수집·이용 및 제3자 제공에 대한 동의를 거부할 권리가 있습니다.</p>
              <p>다만, 동의를 거부할 경우 회원가입 및 O-ring 서비스 이용이 불가능합니다.</p>
            </R.PrivacyNotice>

            {/* 분리된 동의 체크박스 */}
            <R.PrivacyAgreementContainer>
              <R.PrivacyCheckboxWrapper>
                <R.PrivacyCheckbox
                  type="checkbox"
                  id="privacyCollectionAgreement"
                  checked={isPrivacyCollectionAgreed}
                  onChange={() => setIsPrivacyCollectionAgreed(!isPrivacyCollectionAgreed)}
                />
                <R.PrivacyLabel htmlFor="privacyCollectionAgreement">
                  개인정보 수집 및 이용에 동의합니다. (필수)
                </R.PrivacyLabel>
              </R.PrivacyCheckboxWrapper>
              
              <R.PrivacyCheckboxWrapper>
                <R.PrivacyCheckbox
                  type="checkbox"
                  id="privacyThirdPartyAgreement"
                  checked={isPrivacyThirdPartyAgreed}
                  onChange={() => setIsPrivacyThirdPartyAgreed(!isPrivacyThirdPartyAgreed)}
                />
                <R.PrivacyLabel htmlFor="privacyThirdPartyAgreement">
                  개인정보 제3자 제공에 동의합니다. (필수)
                </R.PrivacyLabel>
              </R.PrivacyCheckboxWrapper>
            </R.PrivacyAgreementContainer>
            {errors.privacyAgreement && <R.ErrorMessage isVisible={true}>{errors.privacyAgreement}</R.ErrorMessage>}
            <R.ButtonGroup>
              <R.StyledButton onClick={prevStep} variant="secondary">
                이전
              </R.StyledButton>
              <R.StyledButton 
                onClick={nextStep}
                variant="primary"
                disabled={!isPrivacyAgreed}
              >
                다음
              </R.StyledButton>
            </R.ButtonGroup>
          </R.AnimatedContainer>
        );
      case 3:
        return (
          <R.AnimatedContainer style={fadeIn}>
            <R.StepTitle>본인 인증</R.StepTitle>
            {isVerified && userInfo ? (
              <>
                <R.InputContainer>
                  <R.InputLabel>이름</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    value={userInfo.userName}
                    disabled
                  />
                </R.InputContainer>
                <R.InputContainer>
                  <R.InputLabel>생년월일</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    value={userInfo.userBirthDate}
                    disabled
                  />
                </R.InputContainer>
                <R.InputContainer>
                  <R.InputLabel>핸드폰 번호</R.InputLabel>
                  <R.RegisterInput
                    type="text"
                    value={userInfo.userPhone}
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
      case 4:
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
              {errors.userEmail && <R.ErrorMessage isVisible={true}>{errors.userEmail}</R.ErrorMessage>}
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
                <R.ErrorMessage isVisible={!!passwordErrors.length}>
                  비밀번호는 8자 이상이어야 합니다.
                </R.ErrorMessage>
                <R.ErrorMessage isVisible={!!passwordErrors.lowerCase}>
                  소문자를 포함해야 합니다.
                </R.ErrorMessage>
                <R.ErrorMessage isVisible={!!passwordErrors.number}>
                  숫자를 포함해야 합니다.
                </R.ErrorMessage>
                <R.ErrorMessage isVisible={!!passwordErrors.specialChar}>
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
      case 5:
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
              {errors.userAddress && <R.ErrorMessage isVisible={true}>{errors.userAddress}</R.ErrorMessage>}
            </R.InputContainer>
            <R.AddressSearchButton 
              type="button" 
              onClick={openAddressSearch} 
              disabled={!isScriptLoaded}
            >
              {isScriptLoaded ? "주소 검색" : "로딩 중..."}
            </R.AddressSearchButton>
            {formData.userAddress && (
              <R.InputContainer>
                <R.InputLabel>상세 주소</R.InputLabel>
                <R.RegisterInput
                  type="text"
                  name="addressDetail"
                  value={addressDetail}
                  onChange={handleAddressDetailChange}
                  placeholder="상세 주소를 입력해주세요"
                />
                {errors.addressDetail && <R.ErrorMessage isVisible={true}>{errors.addressDetail}</R.ErrorMessage>}
              </R.InputContainer>
            )}
            <R.PinContainer>
              <R.PinInputWrapper>
                <R.InputLabel>PIN 번호 (4자리 이상)</R.InputLabel>
                <R.PinInput
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="userPin"
                  value={formData.userPin}
                  onChange={handlePinChange}
                  placeholder="••••"
                  minLength={4}
                  maxLength={8}
                  required
                />
              </R.PinInputWrapper>
              <animated.div style={confirmPinSpring}>
                <R.PinInputWrapper>
                  <R.InputLabel>PIN 번호 확인</R.InputLabel>
                  <R.PinInput
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="confirmPin"
                    value={formData.confirmPin}
                    onChange={handlePinChange}
                    placeholder="••••"
                    minLength={4}
                    maxLength={8}
                    required
                  />
                </R.PinInputWrapper>
              </animated.div>
            </R.PinContainer>
            {formData.confirmPin && (
              pinMatch ? (
                <R.SuccessMessage isVisible={true}>PIN 번호가 일치합니다.</R.SuccessMessage>
              ) : (
                <R.ErrorMessage isVisible={true}>PIN 번호가 일치하지 않습니다.</R.ErrorMessage>
              )
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

  const isPrivacyAgreed = isPrivacyCollectionAgreed && isPrivacyThirdPartyAgreed;

  return (
    <R.Container>
      <R.LogoImg src={imgLogo} alt="logo" />
      <R.ContentContainer>
        {renderStep()}
      </R.ContentContainer>
    </R.Container>
  );
};

export default Register;
