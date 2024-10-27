import { useState } from 'react';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

export const usePinUpdate = () => {
    const [isPinChangeMode, setIsPinChangeMode] = useState(false);
    const [pinForm, setPinForm] = useState({
        newPin: '',
        confirmNewPin: ''
    });
    const [pinWarnings, setPinWarnings] = useState({
        pin: '',
        confirm: ''
    });

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 8) {
            setPinForm(prev => ({ ...prev, newPin: value }));
            
            if (value && !VALIDATION_PATTERNS.PIN.test(value)) {
                setPinWarnings(prev => ({
                    ...prev,
                    pin: UPDATE_MESSAGES.VALIDATION.PIN
                }));
            } else {
                setPinWarnings(prev => ({ ...prev, pin: '' }));
            }
        }
    };

    const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 8) {
            setPinForm(prev => ({ ...prev, confirmNewPin: value }));
            
            if (value !== pinForm.newPin) {
                setPinWarnings(prev => ({
                    ...prev,
                    confirm: UPDATE_MESSAGES.VALIDATION.PIN_MISMATCH
                }));
            } else {
                setPinWarnings(prev => ({ ...prev, confirm: '' }));
            }
        }
    };

    return {
        isPinChangeMode,
        setIsPinChangeMode,
        pinForm,
        pinWarnings,
        handlePinChange,
        handleConfirmPinChange
    };
};