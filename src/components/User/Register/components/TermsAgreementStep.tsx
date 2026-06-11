import React, { useState } from 'react';
import { CheckboxIcon } from 'components/Icon/CheckboxIcon';
import { ChevronDownIcon } from 'components/Icon/ChevronDownIcon';
import { PRIVACY_TERMS_CONTENT } from '../constants/terms';
import * as TermsAgreementStepStyle from './TermsAgreementStep.style';

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <TermsAgreementStepStyle.Container>
      <TermsAgreementStepStyle.LogoAndForm>
        <TermsAgreementStepStyle.LogoContainer>
          <TermsAgreementStepStyle.LogoWrapping>
            <TermsAgreementStepStyle.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </TermsAgreementStepStyle.LogoWrapping>
          <TermsAgreementStepStyle.LogoSubText>
            회원가입 후 오카운트의 더 다양한 기능을 만나보세요!
          </TermsAgreementStepStyle.LogoSubText>
        </TermsAgreementStepStyle.LogoContainer>

        <TermsAgreementStepStyle.FormContainer>
          <TermsAgreementStepStyle.TermsContainer>
            <TermsAgreementStepStyle.TermsItem>
              <TermsAgreementStepStyle.CheckboxWrapper onClick={handleAllAgree}>
                <TermsAgreementStepStyle.CheckboxButton type="button" $isChecked={isAllAgreed}>
                  <CheckboxIcon isChecked={isAllAgreed} size={40} />
                </TermsAgreementStepStyle.CheckboxButton>
                <TermsAgreementStepStyle.TermsLabel $isMain>
                  전체 동의하기
                </TermsAgreementStepStyle.TermsLabel>
              </TermsAgreementStepStyle.CheckboxWrapper>
            </TermsAgreementStepStyle.TermsItem>

            <TermsAgreementStepStyle.TermsItem>
              <TermsAgreementStepStyle.CheckboxWrapper onClick={handlePrivacyCollectionChange}>
                <TermsAgreementStepStyle.CheckboxButton
                  type="button"
                  $isChecked={isPrivacyCollectionAgreed}
                >
                  <CheckboxIcon isChecked={isPrivacyCollectionAgreed} size={40} />
                </TermsAgreementStepStyle.CheckboxButton>
                <TermsAgreementStepStyle.TermsLabelWrapper>
                  <TermsAgreementStepStyle.RequiredBadge>
                    [필수]
                  </TermsAgreementStepStyle.RequiredBadge>
                  <TermsAgreementStepStyle.TermsLabel>
                    개인정보 수집 및 이용
                  </TermsAgreementStepStyle.TermsLabel>
                </TermsAgreementStepStyle.TermsLabelWrapper>
              </TermsAgreementStepStyle.CheckboxWrapper>
            </TermsAgreementStepStyle.TermsItem>

            <TermsAgreementStepStyle.TermsItem>
              <TermsAgreementStepStyle.CheckboxWrapper onClick={handlePrivacyThirdPartyChange}>
                <TermsAgreementStepStyle.CheckboxButton
                  type="button"
                  $isChecked={isPrivacyThirdPartyAgreed}
                >
                  <CheckboxIcon isChecked={isPrivacyThirdPartyAgreed} size={40} />
                </TermsAgreementStepStyle.CheckboxButton>
                <TermsAgreementStepStyle.TermsLabelWrapper>
                  <TermsAgreementStepStyle.RequiredBadge>
                    [필수]
                  </TermsAgreementStepStyle.RequiredBadge>
                  <TermsAgreementStepStyle.TermsLabel>
                    개인정보 제3자 제공
                  </TermsAgreementStepStyle.TermsLabel>
                </TermsAgreementStepStyle.TermsLabelWrapper>
              </TermsAgreementStepStyle.CheckboxWrapper>
            </TermsAgreementStepStyle.TermsItem>

            <TermsAgreementStepStyle.DetailItem onClick={toggleDropdown}>
              <TermsAgreementStepStyle.DetailContent>
                <TermsAgreementStepStyle.BulletPoint>•</TermsAgreementStepStyle.BulletPoint>
                <TermsAgreementStepStyle.DetailText>
                  개인정보 수집 및 이용 동의 안내
                </TermsAgreementStepStyle.DetailText>
              </TermsAgreementStepStyle.DetailContent>
              <TermsAgreementStepStyle.DetailButton open={isDropdownOpen}>
                <ChevronDownIcon size={24} />
              </TermsAgreementStepStyle.DetailButton>
            </TermsAgreementStepStyle.DetailItem>

            <TermsAgreementStepStyle.DropdownContent $isOpen={isDropdownOpen}>
              <TermsAgreementStepStyle.DropdownText
                dangerouslySetInnerHTML={{
                  __html: PRIVACY_TERMS_CONTENT.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            </TermsAgreementStepStyle.DropdownContent>
          </TermsAgreementStepStyle.TermsContainer>

          {errors.privacyAgreement && (
            <TermsAgreementStepStyle.ErrorMessage>
              {errors.privacyAgreement}
            </TermsAgreementStepStyle.ErrorMessage>
          )}

          <TermsAgreementStepStyle.NextButton
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            $isEnabled={canProceed}
          >
            다음
          </TermsAgreementStepStyle.NextButton>
        </TermsAgreementStepStyle.FormContainer>
      </TermsAgreementStepStyle.LogoAndForm>
    </TermsAgreementStepStyle.Container>
  );
};
