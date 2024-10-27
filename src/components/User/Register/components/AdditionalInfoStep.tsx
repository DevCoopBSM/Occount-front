import React from 'react';
import { useSpring, animated } from 'react-spring';
import { UserType } from '../types';
import { ERROR_MESSAGES } from '../constants/privacy';
import * as R from '../style';

interface AdditionalInfoStepProps {
  userType: UserType;
  formData: {
    userAddress: string;
    userPin: string;
    confirmPin?: string;
    userCode?: string;
  };
  addressDetail: string;
  showConfirmPin: boolean;
  pinMatch: boolean;
  errors: { [key: string]: string };
  onAddressSearch: () => void;
  onAddressDetailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPinChange: (e: React.ChangeEvent<HTMLInputElement>, userType?: UserType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrev: () => void;
  isScriptLoaded: boolean;
}

export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  userType,
  formData,
  addressDetail,
  showConfirmPin,
  pinMatch,
  errors,
  onAddressSearch,
  onAddressDetailChange,
  onPinChange,
  onSubmit,
  onPrev,
  isScriptLoaded,
}) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  const confirmPinSpring = useSpring({
    height: showConfirmPin ? 80 : 0,
    opacity: showConfirmPin ? 1 : 0,
    overflow: 'hidden',
  });

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
        {errors.userAddress && 
          <R.ErrorMessage isVisible={true}>{errors.userAddress}</R.ErrorMessage>
        }
      </R.InputContainer>

      <R.AddressSearchButton 
        type="button" 
        onClick={onAddressSearch} 
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
            onChange={onAddressDetailChange}
            placeholder="상세 주소를 입력해주세요"
          />
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
            onChange={onPinChange}
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
              onChange={onPinChange}
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
          <R.ErrorMessage isVisible={true}>{ERROR_MESSAGES.PIN_MISMATCH}</R.ErrorMessage>
        )
      )}

      {userType === UserType.STUDENT && (
        <R.InputContainer>
          <R.InputLabel>학생증 바코드</R.InputLabel>
          <R.RegisterInput
            type="text"
            name="userCode"
            value={formData.userCode}
            onChange={onPinChange}
            placeholder="학생증 바코드를 입력해주세요"
            required
          />
          {errors.userCode && 
            <R.ErrorMessage isVisible={true}>{errors.userCode}</R.ErrorMessage>
          }
        </R.InputContainer>
      )}

      <R.ButtonContainer>
        <R.NavigationButton onClick={onPrev} isPrev>
          이전
        </R.NavigationButton>
        <R.NavigationButton onClick={onSubmit}>
          회원가입
        </R.NavigationButton>
      </R.ButtonContainer>
    </R.AnimatedContainer>
  );
};
