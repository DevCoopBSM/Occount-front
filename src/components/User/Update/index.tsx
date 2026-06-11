import * as S from './style';
import { useUserUpdatePage } from './hooks/useUserUpdatePage';
import { BasicInfoSection } from './components/BasicInfoSection';
import { AddressSection } from './components/AddressSection';
import { SecuritySection } from './components/SecuritySection';
import { InvestmentSection } from './components/InvestmentSection';
import { UserTypeSection } from './components/UserTypeSection';
import PaymentModal from 'components/Pg/PaymentModal';

const Update = () => {
  const {
    userInfo,
    handlePhoneChange,
    fetchError,
    successMessage,
    isSuccessMessageVisible,
    passwordChange,
    pinChange,
    addressUpdate,
    investment,
    handleSubmit,
  } = useUserUpdatePage();

  return (
    <S.Container>
      <S.ContentContainer>
        <S.FormLayout>
          <S.StepTitle>회원 정보 수정</S.StepTitle>

          {fetchError && <S.ErrorMessage>{fetchError}</S.ErrorMessage>}
          <S.SuccessMessage isVisible={isSuccessMessageVisible}>{successMessage}</S.SuccessMessage>

          <form onSubmit={handleSubmit}>
            <S.FormSections>
              <S.SectionCard>
                <S.SectionHeader>
                  <S.SectionTitle>기본 정보</S.SectionTitle>
                </S.SectionHeader>
                <BasicInfoSection
                  userInfo={userInfo}
                  isVerified={true}
                  handleChange={handlePhoneChange}
                />
              </S.SectionCard>

              <S.SectionCard>
                <S.SectionHeader>
                  <S.SectionTitle>주소 정보</S.SectionTitle>
                </S.SectionHeader>
                <AddressSection
                  address={userInfo.userAddress}
                  addressDetail={addressUpdate.addressDetail}
                  isAddressSearched={addressUpdate.isAddressSearched}
                  isScriptLoaded={addressUpdate.isScriptLoaded}
                  openAddressSearch={addressUpdate.openAddressSearch}
                  handleAddressDetailChange={addressUpdate.handleAddressDetailChange}
                />
              </S.SectionCard>

              <S.SectionCard>
                <S.SectionHeader>
                  <S.SectionTitle>보안 설정</S.SectionTitle>
                </S.SectionHeader>
                <SecuritySection
                  userEmail={userInfo.email}
                  passwordChange={passwordChange}
                  pinChange={pinChange}
                />
              </S.SectionCard>

              <S.TwoColumnSection>
                <S.SectionCard>
                  <S.SectionHeader>
                    <S.SectionTitle>회원 구분</S.SectionTitle>
                  </S.SectionHeader>
                  <UserTypeSection userInfo={userInfo} />
                </S.SectionCard>

                <S.SectionCard>
                  <S.SectionHeader>
                    <S.SectionTitle>출자금</S.SectionTitle>
                  </S.SectionHeader>
                  <InvestmentSection
                    userInfo={userInfo}
                    maxInvestmentAmount={investment.maxInvestmentAmount}
                    handleOpenInvestmentModal={investment.handleOpenInvestmentModal}
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

      <PaymentModal
        type="investment"
        isOpen={investment.isInvestmentModalOpen}
        onRequestClose={investment.handleCloseInvestmentModal}
        user={{
          email: userInfo.email,
          name: userInfo.username,
          phone: userInfo.phone,
          todayTotalPayment: userInfo.todayTotalPayment || 0,
        }}
        maxAmount={investment.maxInvestmentAmount}
      />
    </S.Container>
  );
};

export default Update;
