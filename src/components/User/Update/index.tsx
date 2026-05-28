import React from 'react';
import * as S from './style';
import { useUpdateForm } from './hooks/useUpdateForm';
import { BasicInfoSection } from './components/BasicInfoSection';
import { VerificationSection } from './components/VerificationSection';
import { AddressSection } from './components/AddressSection';
import { SecuritySection } from './components/SecuritySection';
import { InvestmentSection } from './components/InvestmentSection';
import { UserTypeSection } from './components/UserTypeSection';
import PaymentModal from 'components/Pg/PaymentModal'; // InvestmentModal 대신 PaymentModal import

const Update = () => {
  const { formData, status, messages, handlers, setters } = useUpdateForm();

  return (
    <S.Container>
      <S.ContentContainer>
        <S.FormLayout>
          <S.StepTitle>회원 정보 수정</S.StepTitle>

          {/* 에러/성공 메시지 */}
          <MessageDisplay
            error={messages.fetchError}
            success={messages.successMessage}
            isVisible={status.isSuccessMessageVisible}
          />

          <form onSubmit={handlers.handleSubmit}>
            <S.FormSections>
              <S.SectionCard>
                <S.SectionHeader>
                  <S.SectionTitle>기본 정보</S.SectionTitle>
                </S.SectionHeader>
                <BasicInfoSection
                  userInfo={formData.userInfo}
                  isVerified={status.isVerified}
                  handleChange={handlers.handleAddressDetailChange}
                />
              </S.SectionCard>

              <S.SectionCard>
                <S.SectionHeader>
                  <S.SectionTitle>주소 정보</S.SectionTitle>
                </S.SectionHeader>
                <AddressSection
                  address={formData.userInfo.userAddress}
                  addressDetail={formData.addressDetail}
                  isAddressSearched={status.isAddressSearched}
                  isScriptLoaded={status.isScriptLoaded}
                  openAddressSearch={handlers.openAddressSearch}
                  handleAddressDetailChange={handlers.handleAddressDetailChange}
                />
              </S.SectionCard>

              {!status.isVerified && (
                <S.SectionCard>
                  <S.SectionHeader>
                    <S.SectionTitle>본인 확인</S.SectionTitle>
                  </S.SectionHeader>
                  <VerificationSection
                    isVerified={status.isVerified}
                    currentPassword={formData.currentPassword}
                    setCurrentPassword={setters.setCurrentPassword}
                    handleVerify={handlers.handleVerify}
                    verificationError={messages.verificationError}
                  />
                </S.SectionCard>
              )}

              {status.isVerified && (
                <S.SectionCard>
                  <S.SectionHeader>
                    <S.SectionTitle>보안 설정</S.SectionTitle>
                  </S.SectionHeader>
                  <SecuritySection
                    isVerified={status.isVerified}
                    isPasswordChangeMode={status.isPasswordChangeMode}
                    isPinChangeMode={status.isPinChangeMode}
                    setIsPasswordChangeMode={setters.setIsPasswordChangeMode}
                    setIsPinChangeMode={setters.setIsPinChangeMode}
                    passwordForm={formData.passwordForm}
                    pinForm={formData.pinForm}
                    passwordWarnings={messages.passwordWarnings}
                    pinWarnings={messages.pinWarnings}
                    handlePasswordChange={handlers.handlePasswordChange}
                    handleConfirmPasswordChange={handlers.handleConfirmPasswordChange}
                    handlePinChange={handlers.handlePinChange}
                    handleConfirmPinChange={handlers.handleConfirmPinChange}
                  />
                </S.SectionCard>
              )}

              <S.TwoColumnSection>
                <S.SectionCard>
                  <S.SectionHeader>
                    <S.SectionTitle>회원 구분</S.SectionTitle>
                  </S.SectionHeader>
                  <UserTypeSection userInfo={formData.userInfo} />
                </S.SectionCard>

                <S.SectionCard>
                  <S.SectionHeader>
                    <S.SectionTitle>출자금</S.SectionTitle>
                  </S.SectionHeader>
                  <InvestmentSection
                    userInfo={formData.userInfo}
                    maxInvestmentAmount={formData.maxInvestmentAmount}
                    handleOpenInvestmentModal={handlers.handleOpenInvestmentModal}
                  />
                </S.SectionCard>
              </S.TwoColumnSection>
            </S.FormSections>

            <S.ButtonContainer>
              <S.PrimaryButton type="submit">수정하기</S.PrimaryButton>
            </S.ButtonContainer>
          </form>
        </S.FormLayout>
      </S.ContentContainer>

      {/* 출자금 모달 */}
      <PaymentModal
        type="investment"
        isOpen={status.isInvestmentModalOpen}
        onRequestClose={handlers.handleCloseInvestmentModal}
        user={{
          email: formData.userInfo.userEmail,
          name: formData.userInfo.userName,
          phone: formData.userInfo.userPhone,
          todayTotalPayment: formData.userInfo.todayTotalPayment || 0,
        }}
        maxAmount={formData.maxInvestmentAmount}
      />
    </S.Container>
  );
};

// 메시지 표시 컴포넌트 분리
const MessageDisplay: React.FC<{
  error?: string;
  success?: string;
  isVisible: boolean;
}> = ({ error, success, isVisible }) => (
  <>
    {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    <S.SuccessMessage isVisible={isVisible}>{success}</S.SuccessMessage>
  </>
);

export default Update;
