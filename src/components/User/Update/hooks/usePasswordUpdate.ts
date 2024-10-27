import { useState } from 'react';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

export const usePasswordUpdate = () => {
    const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });
    const [passwordWarnings, setPasswordWarnings] = useState({
        password: '',
        confirm: ''
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordForm(prev => ({ ...prev, newPassword: value }));
        
        if (value && !VALIDATION_PATTERNS.PASSWORD.test(value)) {
            setPasswordWarnings(prev => ({
                ...prev,
                password: UPDATE_MESSAGES.VALIDATION.PASSWORD
            }));
        } else {
            setPasswordWarnings(prev => ({ ...prev, password: '' }));
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordForm(prev => ({ ...prev, confirmNewPassword: value }));
        
        if (value !== passwordForm.newPassword) {
            setPasswordWarnings(prev => ({
                ...prev,
                confirm: UPDATE_MESSAGES.VALIDATION.PASSWORD_MISMATCH
            }));
        } else {
            setPasswordWarnings(prev => ({ ...prev, confirm: '' }));
        }
    };

    return {
        isPasswordChangeMode,
        setIsPasswordChangeMode,
        passwordForm,
        passwordWarnings,
        handlePasswordChange,
        handleConfirmPasswordChange
    };
};