import React from 'react';
import { useSpring, animated } from 'react-spring';
import { UserType } from '../types';
import { ERROR_MESSAGES } from '../constants/privacy';
import * as AdditionalInfoStepStyle from '../style';

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
    config: { duration: 500 },
  });

  const confirmPinSpring = useSpring({
    height: showConfirmPin ? 80 : 0,
    opacity: showConfirmPin ? 1 : 0,
    overflow: 'hidden',
  });

  return (
    <AdditionalInfoStepStyle.AnimatedContainer style={fadeIn}>
      <AdditionalInfoStepStyle.StepTitle>추가 정보 입력</AdditionalInfoStepStyle.StepTitle>

      <AdditionalInfoStepStyle.InputContainer>
        <AdditionalInfoStepStyle.InputLabel>주소</AdditionalInfoStepStyle.InputLabel>
        <AdditionalInfoStepStyle.RegisterInput
          type="text"
          name="userAddress"
          value={formData.userAddress}
          placeholder="주소를 검색해주세요"
          readOnly
          required
        />
        {errors.userAddress && (
          <AdditionalInfoStepStyle.ErrorMessage isVisible={true}>
            {errors.userAddress}
          </AdditionalInfoStepStyle.ErrorMessage>
        )}
      </AdditionalInfoStepStyle.InputContainer>

      <AdditionalInfoStepStyle.AddressSearchButton
        type="button"
        onClick={onAddressSearch}
        disabled={!isScriptLoaded}
      >
        {isScriptLoaded ? '주소 검색' : '로딩 중...'}
      </AdditionalInfoStepStyle.AddressSearchButton>

      {formData.userAddress && (
        <AdditionalInfoStepStyle.InputContainer>
          <AdditionalInfoStepStyle.InputLabel>상세 주소</AdditionalInfoStepStyle.InputLabel>
          <AdditionalInfoStepStyle.RegisterInput
            type="text"
            name="addressDetail"
            value={addressDetail}
            onChange={onAddressDetailChange}
            placeholder="상세 주소를 입력해주세요"
          />
        </AdditionalInfoStepStyle.InputContainer>
      )}

      <AdditionalInfoStepStyle.PinContainer>
        <AdditionalInfoStepStyle.PinInputWrapper>
          <AdditionalInfoStepStyle.InputLabel>
            PIN 번호 (4-6자리)
          </AdditionalInfoStepStyle.InputLabel>
          <AdditionalInfoStepStyle.PinInput
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            name="userPin"
            value={formData.userPin}
            onChange={onPinChange}
            placeholder="••••"
            minLength={4}
            maxLength={6}
            required
          />
        </AdditionalInfoStepStyle.PinInputWrapper>

        <animated.div style={confirmPinSpring}>
          <AdditionalInfoStepStyle.PinInputWrapper>
            <AdditionalInfoStepStyle.InputLabel>PIN 번호 확인</AdditionalInfoStepStyle.InputLabel>
            <AdditionalInfoStepStyle.PinInput
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              name="confirmPin"
              value={formData.confirmPin}
              onChange={onPinChange}
              placeholder="••••"
              minLength={4}
              maxLength={6}
              required
            />
          </AdditionalInfoStepStyle.PinInputWrapper>
        </animated.div>
      </AdditionalInfoStepStyle.PinContainer>

      {formData.confirmPin &&
        (pinMatch ? (
          <AdditionalInfoStepStyle.SuccessMessage isVisible={true}>
            PIN 번호가 일치합니다.
          </AdditionalInfoStepStyle.SuccessMessage>
        ) : (
          <AdditionalInfoStepStyle.ErrorMessage isVisible={true}>
            {ERROR_MESSAGES.PIN_MISMATCH}
          </AdditionalInfoStepStyle.ErrorMessage>
        ))}

      {userType === UserType.STUDENT && (
        <AdditionalInfoStepStyle.InputContainer>
          <AdditionalInfoStepStyle.InputLabel>학생증 바코드</AdditionalInfoStepStyle.InputLabel>
          <AdditionalInfoStepStyle.RegisterInput
            type="text"
            name="userCode"
            value={formData.userCode}
            onChange={onPinChange}
            placeholder="학생증 바코드를 입력해주세요"
            required
          />
          {errors.userCode && (
            <AdditionalInfoStepStyle.ErrorMessage isVisible={true}>
              {errors.userCode}
            </AdditionalInfoStepStyle.ErrorMessage>
          )}
        </AdditionalInfoStepStyle.InputContainer>
      )}

      <AdditionalInfoStepStyle.ButtonContainer>
        <AdditionalInfoStepStyle.NavigationButton onClick={onPrev} isPrev>
          이전
        </AdditionalInfoStepStyle.NavigationButton>
        <AdditionalInfoStepStyle.NavigationButton onClick={onSubmit}>
          회원가입
        </AdditionalInfoStepStyle.NavigationButton>
      </AdditionalInfoStepStyle.ButtonContainer>
    </AdditionalInfoStepStyle.AnimatedContainer>
  );
};
