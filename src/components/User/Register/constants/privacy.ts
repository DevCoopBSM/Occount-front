export const PRIVACY_SECTIONS = {
    PROCESSING: {
      title: '1. 개인정보의 처리 목적 및 항목',
      tableHeaders: {
        category: '구분',
        purpose: '처리 목적',
        items: '처리 항목'
      }
    },
    RETENTION: {
      title: '2. 개인정보의 보유기간 및 파기',
      tableHeaders: {
        period: '보유 기간',
        legal: '법령에 따른 보관 의무',
        disposal: '파기 방법'
      }
    },
    THIRD_PARTY: {
      title: '3. 개인정보 제3자 제공',
      tableHeaders: {
        recipient: '제공받는 자',
        purpose: '제공 목적',
        items: '제공 항목',
        retention: '보유 기간'
      }
    },
    OUTSOURCING: {
      title: '4. 개인정보 처리위탁',
      tableHeaders: {
        processor: '수탁자',
        tasks: '위탁 업무 내용'
      }
    },
    RIGHTS: {
      title: '5. 정보주체의 권리·의무 및 행사방법',
      description: '이용자는 다음과 같은 권리를 행사할 수 있습니다:'
    },
    SECURITY: {
      title: '6. 개인정보의 안전성 확보 조치',
      description: '회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다:'
    },
    OFFICER: {
      title: '7. 개인정보 보호책임자',
      tableHeaders: {
        position: '이사장',
        contact: '연락처'
      }
    }
  } as const;
  
  export const PRIVACY_CONTENT = {
    REQUIRED_ITEMS: {
      purposes: [
        '회원 가입 및 관리',
        '매점 서비스 제공',
        '본인 확인 및 인증',
        '결제 서비스 제공'
      ],
      items: [
        '이름, 생년월일, 이메일',
        '전화번호, 주소',
        'CI(연계정보)',
        '학생의 경우: 학생증 바코드'
      ]
    },
    VERIFICATION_ITEMS: {
      purposes: ['본인 확인 및 인증'],
      items: [
        '이름, 생년월일, 성별',
        '내/외국인 정보',
        '휴대폰 번호',
        'CI/DI 정보'
      ]
    },
    RETENTION: {
      period: '회원 탈퇴 시 또는 조합원 자격 소실 시점으로부터 1년',
      legal_obligations: [
        '전자상거래법: 거래기록 5년',
        '통신비밀보호법: 로그기록 3개월'
      ],
      disposal_methods: [
        '전자적 파일: 복구 불가능한 방법으로 영구 삭제',
        '기타 기록물: 파 또는 소각'
      ]
    },
    THIRD_PARTY: {
      recipient: '스마트로(주)',
      purpose: '전자결제서비스 제공 및 결제도용 방지',
      items: ['이름', '전화번호', '결제정보'],
      retention: '전자상거래법에 따른 보관 기간'
    },
    PROCESSORS: [
      {
        name: 'KG이니시스(주)',
        tasks: [
          '본인확인(간편인증) 서비스',
          '수집 항목: 이름, 생년월일, 성별, 내/외국인 정보, 휴대폰 번호, CI/DI 정보'
        ]
      },
      {
        name: '스마트로(주)',
        tasks: ['결제처리 서비스']
      }
    ],
    USER_RIGHTS: [
      '개인정보 열람, 정정·삭제, 처리정지 요구',
      '개인정보 처리에 대한 동의 철회',
      '※ 권리 행사는 홈페이지 내 설정 메뉴 또는 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하여 요청하실 수 있습니다.'
    ],
    SECURITY_MEASURES: [
      '개인정보 암호화: 비밀번호 등 중요정보는 암호화하여 보관',
      '해킹 등에 대비한 기술적 대책: 암호화 통신 사용, 접근통제 시스템 설치',
      '접근권한 관리: 개인정보처리시스템에 대한 접근권한 차등부여',
      '개인정보 취급자 최소화 및 교육 실시'
    ],
    PRIVACY_OFFICER: {
      title: '이사장',
      name: '김민경',
      contact: '이메일: wonching76@naver.com'
    }
  } as const;
  
  export const PRIVACY_NOTICE = {
    rights: '위 개인정보 수집·이용 및 제3자 제공에 대한 동의를 거부할 권리가 있습니다.',
    consequences: '다만, 동의를 거부할 경우 회원가입 및 O-ring 서비스 이용이 불가능합니다.'
  } as const;
  
  export const PRIVACY_AGREEMENTS = {
    collection: {
      id: 'privacyCollectionAgreement',
      label: '개인정보 수집 및 이용에 동의합니다. (필수)'
    },
    thirdParty: {
      id: 'privacyThirdPartyAgreement',
      label: '개인정보 제3자 제공에 동의합니다. (필수)'
    }
  } as const;
  
  export const ERROR_MESSAGES = {
    PASSWORD_LENGTH: "비밀번호는 8자 이상이어야 합니다.",
    PASSWORD_LOWERCASE: "소문자를 포함해야 합니다.",
    PASSWORD_NUMBER: "숫자를 포함해야 합니다.",
    PASSWORD_SPECIAL: "특수문자를 포함해야 합니다.",
    PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
    PIN_LENGTH: "PIN 번호는 4-6자리여야 합니다.",
    PIN_MISMATCH: "PIN 번호가 일치하지 않습니다.",
  } as const;