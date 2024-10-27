import React from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occregisterLogo.svg";
import axiosInstance from "utils/Axios";
import { UserTypeStep } from './components/UserTypeStep';
import { PrivacyStep } from './components/PrivacyStep';
import { VerificationStep } from './components/VerificationStep';
import { AccountStep } from './components/AccountStep';
import { AdditionalInfoStep } from './components/AdditionalInfoStep';
import { useRegisterForm } from './hooks/useRegisterForm';
import { useVerification } from './hooks/useVerification';
import { useAddress } from './hooks/useAddress';
import { useRegisterStep } from './hooks/useRegisterStep';
import { STEPS } from './constants/steps';
import { UserType, RegisterRequest } from "./types";
import * as R from "./style";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = React.useState<UserType>(UserType.STUDENT);
  const [isPrivacyCollectionAgreed, setIsPrivacyCollectionAgreed] = React.useState(false);
  const [isPrivacyThirdPartyAgreed, setIsPrivacyThirdPartyAgreed] = React.useState(false);

  // Custom Hooks
  const {
    formData,
    setFormData,
    emailPrefix,
    passwordErrors,
    passwordMatch,
    handleInputChange
  } = useRegisterForm();

  const {
    isVerified,
    userInfo,
    handleVerification,
    resetVerification
  } = useVerification();

  const {
    isScriptLoaded,
    addressDetail,
    setAddressDetail,
    openAddressSearch
  } = useAddress();

  const {
    step,
    errors,
    nextStep,
    prevStep
  } = useRegisterStep();

  // 회원가입 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified || !isPrivacyCollectionAgreed || !isPrivacyThirdPartyAgreed) {
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
      }
    } catch (error) {
      console.error("Register error:", error);
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  // 스텝별 컴포넌트 렌더링
  const renderStep = () => {
    switch(step) {
      case STEPS.USER_TYPE:
        return (
          <UserTypeStep
            userType={userType}
            setUserType={setUserType}
            onNext={() => nextStep(step, formData, userType, isVerified, isPrivacyCollectionAgreed, isPrivacyThirdPartyAgreed)}
            onPrev={() => navigate('/')}
          />
        );

      case STEPS.PRIVACY:
        return (
          <PrivacyStep
            isPrivacyCollectionAgreed={isPrivacyCollectionAgreed}
            setIsPrivacyCollectionAgreed={setIsPrivacyCollectionAgreed}
            isPrivacyThirdPartyAgreed={isPrivacyThirdPartyAgreed}
            setIsPrivacyThirdPartyAgreed={setIsPrivacyThirdPartyAgreed}
            onNext={() => nextStep(step, formData, userType, isVerified, isPrivacyCollectionAgreed, isPrivacyThirdPartyAgreed)}
            onPrev={prevStep}
            errors={errors}
          />
        );

      case STEPS.VERIFICATION:
        return (
          <VerificationStep
            isVerified={isVerified}
            userInfo={userInfo}
            onVerify={handleVerification}
            onResetVerification={resetVerification}
            onNext={() => nextStep(step, formData, userType, isVerified, isPrivacyCollectionAgreed, isPrivacyThirdPartyAgreed)}
            onPrev={prevStep}
          />
        );

      case STEPS.ACCOUNT:
        return (
          <AccountStep
            userType={userType}
            emailPrefix={emailPrefix}
            formData={formData}
            passwordErrors={passwordErrors}
            passwordMatch={passwordMatch}
            errors={errors}
            onInputChange={(e) => handleInputChange(e, userType)}
            onNext={() => nextStep(step, formData, userType, isVerified, isPrivacyCollectionAgreed, isPrivacyThirdPartyAgreed)}
            onPrev={prevStep}
          />
        );

      case STEPS.ADDITIONAL_INFO:
        return (
          <AdditionalInfoStep
            userType={userType}
            formData={formData}
            addressDetail={addressDetail}
            showConfirmPin={formData.userPin.length >= 4}
            pinMatch={formData.userPin === formData.confirmPin}
            errors={errors}
            onAddressSearch={() => openAddressSearch(setFormData)}
            onAddressDetailChange={(e) => setAddressDetail(e.target.value)}
            onPinChange={handleInputChange}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isScriptLoaded={isScriptLoaded}
          />
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
    </R.Container>
  );
};

export default Register;