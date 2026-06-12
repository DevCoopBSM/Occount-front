import { useState } from 'react';
import { validateStep } from '../utils/validation';
import { STEPS, StepType } from '../constants/steps';
import { ErrorState } from '../types';

export const useRegisterStep = () => {
  const [step, setStep] = useState<StepType>(STEPS.TERMS_AGREEMENT);
  const [errors, setErrors] = useState<ErrorState>({});

  const nextStep = (
    currentStep: number,
    formData: any,
    isVerified: boolean,
    isPrivacyCollectionAgreed: boolean,
    isPrivacyThirdPartyAgreed: boolean,
    isEmailVerified = false
  ) => {
    const stepErrors = validateStep(
      currentStep,
      formData,
      isVerified,
      isPrivacyCollectionAgreed,
      isPrivacyThirdPartyAgreed,
      isEmailVerified
    );

    if (Object.keys(stepErrors).length === 0) {
      setStep((prev) => (prev + 1) as StepType);
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as StepType);
    }
  };

  return {
    step,
    errors,
    nextStep,
    prevStep,
  };
};
