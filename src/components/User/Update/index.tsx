import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/Axios';
import axios from 'axios';
import * as S from './style';
import InvestmentModal from '../../Pg/InvestmentModal';
import { FaMoneyBillWave } from 'react-icons/fa';  // 아이콘 import

enum UserType {
    TEACHER = "교사",
    STUDENT = "학생",
    PARENT = "학부모"
}

enum Role {
    ROLE_DEACTIVATED = "비활성",
    ROLE_USER = "일반 사용자",
    ROLE_MEMBER = "조합원",
    ROLE_COOP = "매점부",
    ROLE_ADMIN = "관리자"
}

interface UserInfo {
    userName: string;
    userEmail: string;
    userPassword: string;
    userAddress: string;
    userPin: string;
    userType: UserType;
    role: Role;
    userPhone: string;
    userBirthDate: string;
    investmentAmount: number;
}

const Update = () => {
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('/account/info');
                setUserInfo(response.data);
            } catch (error) {
                setErrorMessage('사용자 정보를 불러오는 데 실패했습니다.');
            }
        };
        fetchUserInfo();
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
            const response = await axiosInstance.post('/account/verify', {
                userPassword: currentPassword,
            });
            if (response.data.verified) {
                setIsVerified(true);
                setErrorMessage('');
            } else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('인증 과정에서 오류가 발생했습니다.');
        }
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const validatePin = (pin: string) => {
        return /^\d{6}$/.test(pin);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isVerified) {
            setErrorMessage('먼저 인증을 완료해주세요.');
            return;
        }
        
        if (isPasswordChangeMode) {
            if (!validatePassword(newPassword)) {
                setErrorMessage('새 비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.');
                return;
            }
            if (newPassword !== confirmNewPassword) {
                setErrorMessage('새 비밀번호가 일치하지 않습니다.');
                return;
            }
        }
        
        if (isPinChangeMode) {
            if (!validatePin(newPin)) {
                setErrorMessage('PIN은 6자리 숫자여야 합니다.');
                return;
            }
            if (newPin !== confirmNewPin) {
                setErrorMessage('새 PIN이 일치하지 않습니다.');
                return;
            }
        }
        
        try {
            const response = await axiosInstance.put('/account/update', {
                ...userInfo,
                newPassword: isPasswordChangeMode ? newPassword : undefined,
                newPin: isPinChangeMode ? newPin : undefined,
            });
            alert(response.data.message);
            setIsPasswordChangeMode(false);
            setIsPinChangeMode(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || '회원정보 수정 중 오류가 발생했습니다.');
            } else {
                setErrorMessage('회원정보 수정 중 오류가 발생했습니다.');
            }
        }
    };

    const handleInvestment = async () => {
        try {
            const response = await axiosInstance.post('/account/invest', {
                amount: investmentAmount
            });
            alert(response.data.message);
            // 사용자 정보 새로고침
            const updatedUserInfo = await axiosInstance.get('/account/info');
            setUserInfo(updatedUserInfo.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || '출자금 납부 중 오류가 발생했습니다.');
            } else {
                setErrorMessage('출자금 납부 중 오류가 발생했습니다.');
            }
        }
        setIsInvestmentModalOpen(false);
    };

    const increaseAmount = () => {
        setInvestmentAmount(prev => Math.min(prev + 10000, 50000));
    };

    const decreaseAmount = () => {
        setInvestmentAmount(prev => Math.max(prev - 10000, 10000));
    };

    const handleCloseInvestmentModal = () => {
        setIsInvestmentModalOpen(false);
    };

    return (
        <S.Container>
            <S.ContentContainer>
                <S.StepTitle>회원 정보 수정</S.StepTitle>
                {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
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
                        <S.RegisterInput
                            type="text"
                            name="userAddress"
                            value={userInfo.userAddress}
                            onChange={handleChange}
                        />
                    </S.InputContainer>

                    {!isVerified && (
                        <>
                            <S.InfoMessage>암호와 핀번호를 변경하기 위해서는 인증해야 합니다</S.InfoMessage>
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
                        </>
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
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="새 비밀번호"
                                        />
                                    </S.InputContainer>
                                    <S.InputContainer>
                                        <S.InputLabel>새 비밀번호 확인</S.InputLabel>
                                        <S.RegisterInput
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            placeholder="새 비밀번호 확인"
                                        />
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
                                            value={newPin}
                                            onChange={(e) => setNewPin(e.target.value)}
                                            placeholder="새 PIN (6자리)"
                                        />
                                    </S.InputContainer>
                                    <S.InputContainer>
                                        <S.InputLabel>새 PIN 확인</S.InputLabel>
                                        <S.RegisterInput
                                            type="password"
                                            value={confirmNewPin}
                                            onChange={(e) => setConfirmNewPin(e.target.value)}
                                            placeholder="새 PIN 확인"
                                        />
                                    </S.InputContainer>
                                </S.SecuritySection>
                            )}
                        </>
                    )}
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
                        <S.InputLabel>회원 유형</S.InputLabel>
                        <S.RegisterInput
                            type="text"
                            name="userType"
                            value={userInfo.userType}
                            disabled
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>역할</S.InputLabel>
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
                            <S.InvestmentButton type="button" onClick={handleInvestment}>
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
                user={userInfo}
                increaseAmount={increaseAmount}
                decreaseAmount={decreaseAmount}
            />
        </S.Container>
    );
};

export default Update;
