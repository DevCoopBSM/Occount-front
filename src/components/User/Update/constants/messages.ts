export const UPDATE_MESSAGES = {
    VERIFY: {
      SUCCESS: '인증에 성공했습니다. 이제 비밀번호와 PIN을 변경할 수 있습니다.',
      FAIL: '비밀번호가 일치하지 않습니다.',
      ERROR: '인증 과정에서 오류가 발생했습니다.',
      REQUIRED: '인증이 필요한 작업입니다.'
    },
    FETCH: {
      ERROR: '사용자 정보를 불러오는 데 실패했습니다.',
    },
    UPDATE: {
      SUCCESS: '회원정보가 성공적으로 수정되었습니다.',
      ERROR: '회원정보 수정 중 오류가 발생했습니다.',
    },
    VALIDATION: {
      PASSWORD: '새 비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.',
      PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
      PIN: 'PIN은 4자리 이상 8자리 이하의 숫자여야 합니다.',
      PIN_MISMATCH: 'PIN이 일치하지 않습니다.',
    },
    INFO: {
      SECURITY: '⚠️ 보안을 위해 비밀번호/PIN 변경 및 전화번호 수정은 현재 비밀번호 인증이 필요합니다.',
      ADDRESS_LOADING: '주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.',
    }
  } as const;
