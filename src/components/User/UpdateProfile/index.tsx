import React, { useState } from 'react';
import axiosInstance from '../../../utils/Axios'; // Axios 인스턴스 가져오기

const UpdateProfile = () => {
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPin, setUserPin] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/account/update', {
                userAddress,
                userPassword,
                userPin,
            });
            alert(response.data);
        } catch (error) {
            alert('회원정보 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="주소"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="핀번호"
                value={userPin}
                onChange={(e) => setUserPin(e.target.value)}
            />
            <button type="submit">수정하기</button>
        </form>
    );
};

export default UpdateProfile;