export const STEPS = {
  TERMS_AGREEMENT: 1,
  VERIFICATION: 2,
  ACCOUNT: 3,
  PIN: 4,
} as const;

export type StepType = (typeof STEPS)[keyof typeof STEPS];

export const TOTAL_STEPS = 4;
