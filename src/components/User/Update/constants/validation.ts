export const VALIDATION_PATTERNS = {
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    PIN: /^\d{4,6}$/,
  } as const;