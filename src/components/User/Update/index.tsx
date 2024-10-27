import React from 'react';
import * as S from './style';
import { useUpdateForm } from './hooks/useUpdateForm';
import { BasicInfoSection } from './components/BasicInfoSection';
import { VerificationSection } from './components/VerificationSection';
import { AddressSection } from './components/AddressSection';
import { SecuritySection } from './components/SecuritySection';
import { InvestmentSection } from './components/InvestmentSection';
import { UserTypeSection } from './components/UserTypeSection';  // 새로 분리
import InvestmentModal from 'components/Pg/InvestmentModal';

const Update = () => {
    const {
        formData,
        status,
        messages,
        handlers,
        setters
    } = useUpdateForm();

    return (
        <S.Container>
            <S.ContentContainer>
                <S.StepTitle>회원 정보 수정</S.StepTitle>
                
                {/* 에러/성공 메시지 */}
                <MessageDisplay 
                    error={messages.fetchError}
                    success={messages.successMessage}
                    isVisible={status.isSuccessMessageVisible}
                />

                <form onSubmit={handlers.handleSubmit}>
                    {/* 기본 정보 섹션 */}
                    <BasicInfoSection
                        userInfo={formData.userInfo}
                        isVerified={status.isVerified}
                        handleChange={handlers.handleAddressDetailChange}
                    />

                    {/* 주소 섹션 */}
                    <AddressSection
                        address={formData.userInfo.userAddress}
                        addressDetail={formData.addressDetail}
                        isAddressSearched={status.isAddressSearched}
                        isScriptLoaded={status.isScriptLoaded}
                        openAddressSearch={handlers.openAddressSearch}
                        handleAddressDetailChange={handlers.handleAddressDetailChange}
                    />

                    {/* 인증 섹션 */}
                    <VerificationSection
                        isVerified={status.isVerified}
                        currentPassword={formData.currentPassword}
                        setCurrentPassword={setters.setCurrentPassword}
                        handleVerify={handlers.handleVerify}
                        verificationError={messages.verificationError}
                    />

                    {/* 보안 섹션 */}
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
                    {/* 회원 유형 및 권한 */}
                    <UserTypeSection userInfo={formData.userInfo} />

                    {/* 출자금 섹션 */}
                    <InvestmentSection
                        userInfo={formData.userInfo}
                        maxInvestmentAmount={formData.maxInvestmentAmount}
                        handleOpenInvestmentModal={handlers.handleOpenInvestmentModal}
                    />

                    <S.ButtonContainer>
                        <S.PrimaryButton type="submit">수정하기</S.PrimaryButton>
                    </S.ButtonContainer>
                </form>
            </S.ContentContainer>

            {/* 출자금 모달 */}
            <InvestmentModal
                isOpen={status.isInvestmentModalOpen}
                onRequestClose={handlers.handleCloseInvestmentModal}
                investmentAmount={formData.investmentAmount}
                setInvestmentAmount={setters.setInvestmentAmount}
                user={{
                    email: formData.userInfo.userEmail,
                    name: formData.userInfo.userName,
                    phone: formData.userInfo.userPhone
                }}
                increaseAmount={handlers.increaseAmount}
                decreaseAmount={handlers.decreaseAmount}
                maxInvestmentAmount={formData.maxInvestmentAmount}
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
        <S.SuccessMessage isVisible={isVisible}>
            {success}
        </S.SuccessMessage>
    </>
);

export default Update;