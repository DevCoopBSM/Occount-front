import React, { useState, useEffect } from 'react';
import axiosInstance from 'utils/Axios';
import axios from 'axios';
import * as S from './style';
import InvestmentModal from 'components/Pg/InvestmentModal';
import { FaMoneyBillWave } from 'react-icons/fa';  // 아이콘 import
import { useAuth } from 'contexts/authContext';  // useAuth 훅 import
import { UserType, Role, UserInfo } from './types';

const Update = () => {
    const { user, refetchUser } = useAuth();  // useAuth 훅 사용
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userName: '',
        userEmail: '',
        userPassword: '',
        userAddress: '',
        userPin: '',
        userType: UserType.STUDENT,
        role: Role.ROLE_USER,
        userPhone: '',
        userBirthDate: '',
        investmentAmount: 0,
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmNewPin, setConfirmNewPin] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(10000); // 최소 출자금으로 초기화
    const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
    const [isPinChangeMode, setIsPinChangeMode] = useState(false);
    const [temporaryToken, setTemporaryToken] = useState('');
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [addressDetail, setAddressDetail] = useState("");
    const [isAddressSearched, setIsAddressSearched] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState('');
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');
    const [pinWarning, setPinWarning] = useState('');
    const [confirmPinWarning, setConfirmPinWarning] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('/v2/account/info');
                setUserInfo(response.data);
            } catch {
                setErrorMessage('사용자 정보를 불러오는 데 실패했습니다.');
            }
        };
        fetchUserInfo();
    }, []);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleVerify = async () => {
        try {
            const response = await axiosInstance.post('/v2/account/verify', {
                userPassword: currentPassword,
            });
            if (response.data.success) {
                setIsVerified(true);
                setTemporaryToken(response.data.token);
                setErrorMessage('');
                setSuccessMessage('인증에 성공했습니다. 이제 비밀번호와 PIN을 변경할 수 있습니다.');
                setIsSuccessMessageVisible(true);
                // 3초 후에 성공 메시지를 숨깁니다.
                setTimeout(() => {
                    setIsSuccessMessageVisible(false);
                    setSuccessMessage('');
                }, 3000);
            } else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch {
            setErrorMessage('인증 과정에서 오류가 발생했습니다.');
        }
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const validatePin = (pin: string) => {
        return /^\d{4,8}$/.test(pin);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const updateData: any = { ...userInfo };
            
            // 주소와 상세주소 합치기
            if (addressDetail) {
                updateData.userAddress = `${userInfo.userAddress} ${addressDetail}`.trim();
            }
            
            if (isPasswordChangeMode) {
                if (!isVerified) {
                    setErrorMessage('비밀번호 변경을 위해서는 인증이 필요합니다.');
                    return;
                }
                if (!validatePassword(newPassword)) {
                    setErrorMessage('새 비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.');
                    return;
                }
                if (newPassword !== confirmNewPassword) {
                    setErrorMessage('새 비밀번호가 일치하지 않습니다.');
                    return;
                }
                updateData.newPassword = newPassword;
                updateData.temporaryToken = temporaryToken;
            }
            
            if (isPinChangeMode) {
                if (!isVerified) {
                    setErrorMessage('PIN 변경을 위해서는 인증이 필요합니다.');
                    return;
                }
                if (!validatePin(newPin)) {
                    setErrorMessage('PIN은 4자리 이상 8자리 이하의 숫자여야 합니다.');
                    return;
                }
                if (newPin !== confirmNewPin) {
                    setErrorMessage('새 PIN이 일치하지 않습니다.');
                    return;
                }
                updateData.newPin = newPin;
                updateData.temporaryToken = temporaryToken;
            }
            
            await axiosInstance.put('/v2/account/update', updateData);
            // 성공 메시지 표시
            alert('회원정보가 성공적으로 수정되었습니다.');
            setIsPasswordChangeMode(false);
            setIsPinChangeMode(false);
            setTemporaryToken('');
            // 사용자 정보 업데이트
            const updatedUserInfo = await axiosInstance.get('/v2/account/info');
            setUserInfo(updatedUserInfo.data);
            setAddressDetail(""); // 상세주소 초기화
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || '회원정보 수정 중 오류가 발생했습니다.');
            } else {
                setErrorMessage('회원정보 수정 중 오류가 발생했습니다.');
            }
        }
    };

    const handleOpenInvestmentModal = () => {
        setIsInvestmentModalOpen(true);
    };

    const handleCloseInvestmentModal = () => {
        setIsInvestmentModalOpen(false);
        refetchUser();  // 모달이 닫힐 때 사용자 정보 새로고침
    };

    const increaseAmount = () => {
        setInvestmentAmount(prev => {
            const newAmount = prev + 10000;
            const remainingLimit = 50000 - (user?.todayTotalCharge || 0);
            return Math.min(newAmount, remainingLimit, 50000);
        });
    };

    const decreaseAmount = () => {
        setInvestmentAmount(prev => Math.max(prev - 10000, 10000));
    };

    const maxInvestmentAmount = 50000 - (user?.todayTotalCharge || 0);

    const openAddressSearch = () => {
        if (!isScriptLoaded) {
            alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
            return;
        }
        
        new window.daum.Postcode({
            oncomplete: function(data: any) {
                setUserInfo(prevState => ({
                    ...prevState,
                    userAddress: data.roadAddress
                }));
                setAddressDetail("");
                setIsAddressSearched(true);
            }
        }).open();
    };

    const handleAddressDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressDetail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value);
        if (value && !validatePassword(value)) {
            setPasswordWarning('비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.');
        } else {
            setPasswordWarning('');
        }
        if (confirmNewPassword && value !== confirmNewPassword) {
            setConfirmPasswordWarning('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordWarning('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmNewPassword(value);
        if (newPassword && value !== newPassword) {
            setConfirmPasswordWarning('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordWarning('');
        }
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 8) {
            setNewPin(value);
            if (value && !validatePin(value)) {
                setPinWarning('PIN은 4자리 이상 8자리 이하의 숫자여야 합니다.');
            } else {
                setPinWarning('');
            }
            if (confirmNewPin && value !== confirmNewPin) {
                setConfirmPinWarning('PIN이 일치하지 않습니다.');
            } else {
                setConfirmPinWarning('');
            }
        }
    };

    const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 8) {
            setConfirmNewPin(value);
            if (newPin && value !== newPin) {
                setConfirmPinWarning('PIN이 일치하지 않습니다.');
            } else {
                setConfirmPinWarning('');
            }
        }
    };

    return (
        <S.Container>
            <S.ContentContainer>
                <S.StepTitle>회원 정보 수정</S.StepTitle>
                {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                <S.SuccessMessage isVisible={isSuccessMessageVisible}>{successMessage}</S.SuccessMessage>
                

                
                <form onSubmit={handleSubmit}>
                    <S.InputContainer>
                        <S.InputLabel>이름</S.InputLabel>
                        <S.RegisterInput
                            type="text"
                            name="userName"
                            value={userInfo.userName}
                            disabled
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>생년월일</S.InputLabel>
                        <S.RegisterInput
                            type="text"
                            name="userBirthDate"
                            value={userInfo.userBirthDate}
                            disabled
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>이메일</S.InputLabel>
                        <S.RegisterInput
                            type="email"
                            name="userEmail"
                            value={userInfo.userEmail}
                            disabled
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>전화번호</S.InputLabel>
                        <S.RegisterInput
                            type="tel"
                            name="userPhone"
                            value={userInfo.userPhone}
                            onChange={handleChange}
                            disabled={!isVerified}
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>주소</S.InputLabel>
                        <S.AddressInputContainer>
                            <S.AddressInput
                                type="text"
                                name="userAddress"
                                value={userInfo.userAddress}
                                placeholder="주소를 검색해주세요"
                                readOnly
                                required
                            />
                            <S.AddressSearchButton 
                                type="button" 
                                onClick={openAddressSearch} 
                                disabled={!isScriptLoaded}
                            >
                                주소 검색
                            </S.AddressSearchButton>
                        </S.AddressInputContainer>
                    </S.InputContainer>
                    {isAddressSearched && (
                        <S.InputContainer>
                            <S.InputLabel>상세 주소</S.InputLabel>
                            <S.RegisterInput
                                type="text"
                                name="addressDetail"
                                value={addressDetail}
                                onChange={handleAddressDetailChange}
                                placeholder="상세 주소를 입력해주세요"
                            />
                        </S.InputContainer>
                    )}
                {/* 인증 설명 추가 */}
                <S.InfoMessage>
                    ⚠️ 보안을 위해 비밀번호/PIN 변경 및 전화번호 수정은 현재 비밀번호 인증이 필요합니다.
                </S.InfoMessage>
                    {!isVerified && (
                        <S.AuthContainer>
                            <S.InputContainer>
                                <S.InputLabel>현재 비밀번호</S.InputLabel>
                                <S.RegisterInput
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="현재 비밀번호"
                                />
                            </S.InputContainer>
                            <S.VerificationButton onClick={handleVerify} type="button">
                                인증하기
                            </S.VerificationButton>
                        </S.AuthContainer>
                    )}
                    
                    {isVerified && (
                        <>
                            <S.CheckboxContainer>
                                <input
                                    type="checkbox"
                                    checked={isPasswordChangeMode}
                                    onChange={() => setIsPasswordChangeMode(!isPasswordChangeMode)}
                                />
                                <label>비밀번호 변경</label>
                            </S.CheckboxContainer>
                            
                            {isPasswordChangeMode && (
                                <S.SecuritySection>
                                    <S.InputContainer>
                                        <S.InputLabel>새 비밀번호</S.InputLabel>
                                        <S.RegisterInput
                                            type="password"
                                            value={newPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="새 비밀번호"
                                        />
                                        {passwordWarning && <S.WarningMessage>{passwordWarning}</S.WarningMessage>}
                                    </S.InputContainer>
                                    <S.InputContainer>
                                        <S.InputLabel>새 비밀번호 확인</S.InputLabel>
                                        <S.RegisterInput
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={handleConfirmPasswordChange}
                                            placeholder="새 비밀번호 확인"
                                        />
                                        {confirmPasswordWarning && <S.WarningMessage>{confirmPasswordWarning}</S.WarningMessage>}
                                    </S.InputContainer>
                                </S.SecuritySection>
                            )}
                            
                            <S.CheckboxContainer>
                                <input
                                    type="checkbox"
                                    checked={isPinChangeMode}
                                    onChange={() => setIsPinChangeMode(!isPinChangeMode)}
                                />
                                <label>PIN 변경</label>
                            </S.CheckboxContainer>
                            
                            {isPinChangeMode && (
                                <S.SecuritySection>
                                    <S.InputContainer>
                                        <S.InputLabel>새 PIN</S.InputLabel>
                                        <S.RegisterInput
                                            type="password"
                                            inputMode="numeric"
                                            maxLength={8}
                                            value={newPin}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value.length <= 8) {
                                                    setNewPin(value);
                                                }
                                            }}
                                            onKeyPress={(e) => {
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="새 PIN (4-8자리)"
                                        />
                                        {pinWarning && <S.WarningMessage>{pinWarning}</S.WarningMessage>}
                                    </S.InputContainer>
                                    <S.InputContainer>
                                        <S.InputLabel>새 PIN 확인</S.InputLabel>
                                        <S.RegisterInput
                                            type="password"
                                            inputMode="numeric"
                                            maxLength={8}
                                            value={confirmNewPin}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value.length <= 8) {
                                                    setConfirmNewPin(value);
                                                }
                                            }}
                                            onKeyPress={(e) => {
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="새 PIN 확인"
                                        />
                                        {confirmPinWarning && <S.WarningMessage>{confirmPinWarning}</S.WarningMessage>}
                                    </S.InputContainer>
                                </S.SecuritySection>
                            )}
                        </>
                    )}

                    <S.InputContainer>
                        <S.InputLabel>회원 유형</S.InputLabel>
                        <S.RegisterInput
                            type="text"
                            name="userType"
                            value={UserType[userInfo.userType] || userInfo.userType}
                            disabled
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>권한</S.InputLabel>
                        <S.RegisterInput
                            type="text"
                            name="role"
                            value={Role[userInfo.role]}
                            disabled
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>출자금</S.InputLabel>
                        <S.InvestmentContainer>
                            <S.InvestmentInput
                                type="text"
                                name="investmentAmount"
                                value={`${userInfo.investmentAmount}원`}
                                disabled
                            />
                            <S.InvestmentButton 
                                type="button" 
                                onClick={handleOpenInvestmentModal}
                                disabled={maxInvestmentAmount <= 0}
                            >
                                <FaMoneyBillWave />
                                출자금 납부
                            </S.InvestmentButton>
                        </S.InvestmentContainer>
                    </S.InputContainer>
                    <S.ButtonContainer>
                        <S.PrimaryButton type="submit">수정하기</S.PrimaryButton>
                    </S.ButtonContainer>
                </form>
            </S.ContentContainer>
            <InvestmentModal
                isOpen={isInvestmentModalOpen}
                onRequestClose={handleCloseInvestmentModal}
                investmentAmount={investmentAmount}
                setInvestmentAmount={setInvestmentAmount}
                user={user ? {
                    email: user.email,
                    name: user.name,
                    phone: user.phone || ''
                } : null}
                increaseAmount={increaseAmount}
                decreaseAmount={decreaseAmount}
                maxInvestmentAmount={maxInvestmentAmount}
            />
        </S.Container>
    );
};

export default Update;
