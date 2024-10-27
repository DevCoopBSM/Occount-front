import { useState } from 'react';
import { validateStep } from '../utils/validation';
import { ErrorState, UserType, STEPS, StepType } from '../types';

export const useRegisterStep = () => {
  const [step, setStep] = useState<StepType>(STEPS.USER_TYPE);
  const [errors, setErrors] = useState<ErrorState>({});

  const nextStep = (
    currentStep: number,
    formData: any,
    userType: UserType,
    isVerified: boolean,
    isPrivacyCollectionAgreed: boolean,
    isPrivacyThirdPartyAgreed: boolean
  ) => {
    const stepErrors = validateStep(
      currentStep,
      formData,
      userType,
      isVerified,
      isPrivacyCollectionAgreed,
      isPrivacyThirdPartyAgreed
    );
    
    if (Object.keys(stepErrors).length === 0) {
      setStep(prev => prev + 1 as StepType);
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1 as StepType);
    }
  };

  return {
    step,
    errors,
    nextStep,
    prevStep
  };
};
