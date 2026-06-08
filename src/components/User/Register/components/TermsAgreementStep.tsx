import React, { useState } from 'react';
import { CheckboxIcon } from './CheckboxIcon';
import * as S from './TermsAgreementStep.style';

interface TermsAgreementStepProps {
  onNext: () => void;
  onPrev: () => void;
  isPrivacyCollectionAgreed: boolean;
  setIsPrivacyCollectionAgreed: (value: boolean) => void;
  isPrivacyThirdPartyAgreed: boolean;
  setIsPrivacyThirdPartyAgreed: (value: boolean) => void;
  errors: { [key: string]: string };
}

export const TermsAgreementStep: React.FC<TermsAgreementStepProps> = ({
  onNext,
  onPrev,
  isPrivacyCollectionAgreed,
  setIsPrivacyCollectionAgreed,
  isPrivacyThirdPartyAgreed,
  setIsPrivacyThirdPartyAgreed,
  errors,
}) => {
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAllAgree = () => {
    const newValue = !isAllAgreed;
    setIsAllAgreed(newValue);
    setIsPrivacyCollectionAgreed(newValue);
    setIsPrivacyThirdPartyAgreed(newValue);
  };

  const handlePrivacyCollectionChange = () => {
    const newValue = !isPrivacyCollectionAgreed;
    setIsPrivacyCollectionAgreed(newValue);

    if (!newValue) {
      setIsAllAgreed(false);
    } else if (newValue && isPrivacyThirdPartyAgreed) {
      setIsAllAgreed(true);
    }
  };

  const handlePrivacyThirdPartyChange = () => {
    const newValue = !isPrivacyThirdPartyAgreed;
    setIsPrivacyThirdPartyAgreed(newValue);

    if (!newValue) {
      setIsAllAgreed(false);
    } else if (newValue && isPrivacyCollectionAgreed) {
      setIsAllAgreed(true);
    }
  };

  const canProceed = isPrivacyCollectionAgreed && isPrivacyThirdPartyAgreed;

  const privacyTermsContent = `회원 가입 과정에서 개인정보 보호법 제15조제1항제4호(계약 체결/이행)에 따라,
다음과 같은 개인정보를 수집·이용합니다.

**1. 수집하는 개인정보의 항목 :**
[필수] 이름, 생년월일, 이메일, 전화번호, CI(연계정보), DI(중복가입 확인정보), 학생증 바코드, 내/외국인 정보
[선택] 거주지 정보

**2. 개인정보 처리 목적**
• 회원 가입 및 관리, 본인 확인 및 인증
• 매점 및 결제 서비스 제공
• 법령에 따른 기록 보존 및 부정 이용 방지

**3. 개인정보의 보유 및 파기**
보유 기간: 회원 탈퇴 또는 조합원 자격 소실 시로부터 1년
법령 보관: 전자상거래 결제 기록(5년), 통신 로그(3개월) 등 법적 의무 기간 준수
파기 방법: 복구 불가능한 방법으로 즉시 삭제 또는 파쇄

**4. 제3자 제공 및 위탁**
결제/인증 서비스: 스마트로(주), KG이니시스(주)
제공 항목: 이름, 연락처, 결제 정보, 인증 데이터 등 (서비스 이행 목적)

**5. 이용자의 권리:**
이용자는 언제든지 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.
문의: 이사장 김민경 (wonching76@naver.com)`;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <S.Container>
      <S.LogoAndForm>
        <S.LogoContainer>
          <S.LogoWrapping>
            <S.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </S.LogoWrapping>
          <S.LogoSubText>회원가입 후 오카운트의 더 다양한 기능을 만나보세요!</S.LogoSubText>
        </S.LogoContainer>

        <S.FormContainer>
          <S.TermsContainer>
            <S.TermsItem>
              <S.CheckboxWrapper onClick={handleAllAgree}>
                <S.CheckboxButton
                  type="button"
                  $isChecked={isAllAgreed}
                >
                  <CheckboxIcon isChecked={isAllAgreed} size={40} />
                </S.CheckboxButton>
                <S.TermsLabel $isMain>전체 동의하기</S.TermsLabel>
              </S.CheckboxWrapper>
            </S.TermsItem>

            <S.TermsItem>
              <S.CheckboxWrapper onClick={handlePrivacyCollectionChange}>
                <S.CheckboxButton
                  type="button"
                  $isChecked={isPrivacyCollectionAgreed}
                >
                  <CheckboxIcon isChecked={isPrivacyCollectionAgreed} size={40} />
                </S.CheckboxButton>
                <S.TermsLabelWrapper>
                  <S.RequiredBadge>[필수]</S.RequiredBadge>
                  <S.TermsLabel>개인정보 수집 및 이용</S.TermsLabel>
                </S.TermsLabelWrapper>
              </S.CheckboxWrapper>
            </S.TermsItem>

            <S.TermsItem>
              <S.CheckboxWrapper onClick={handlePrivacyThirdPartyChange}>
                <S.CheckboxButton
                  type="button"
                  $isChecked={isPrivacyThirdPartyAgreed}
                >
                  <CheckboxIcon isChecked={isPrivacyThirdPartyAgreed} size={40} />
                </S.CheckboxButton>
                <S.TermsLabelWrapper>
                  <S.RequiredBadge>[필수]</S.RequiredBadge>
                  <S.TermsLabel>개인정보 제3자 제공</S.TermsLabel>
                </S.TermsLabelWrapper>
              </S.CheckboxWrapper>
            </S.TermsItem>

            <S.DetailItem onClick={toggleDropdown}>
              <S.DetailContent>
                <S.BulletPoint>•</S.BulletPoint>
                <S.DetailText>개인정보 수집 및 이용 동의 안내</S.DetailText>
              </S.DetailContent>
              <S.DetailButton open={isDropdownOpen}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </S.DetailButton>
            </S.DetailItem>

            <S.DropdownContent $isOpen={isDropdownOpen}>
              <S.DropdownText
                dangerouslySetInnerHTML={{
                  __html: privacyTermsContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </S.DropdownContent>
          </S.TermsContainer>

          {errors.privacyAgreement && (
            <S.ErrorMessage>{errors.privacyAgreement}</S.ErrorMessage>
          )}

          <S.NextButton
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            $isEnabled={canProceed}
          >
            다음
          </S.NextButton>
        </S.FormContainer>
      </S.LogoAndForm>
    </S.Container>
  );
};