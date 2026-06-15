# Occount Frontend Project

## 프로젝트 개요
- **프로젝트명**: AriPay (O-ccount Client)
- **버전**: 0.1.0
- **타입**: React 기반 웹 애플리케이션
- **포트**: 7000

## 기술 스택

### 프레임워크 & 라이브러리
- **React**: 18.2.0 (함수형 컴포넌트 기반)
- **TypeScript**: 5.5.4 (부분적 적용)
- **React Router Dom**: v6 (라우팅)
- **Styled Components**: 6.1.13 (CSS-in-JS)

### 상태 관리 & 컨텍스트
- **Context API**: 인증 및 로딩 상태 관리
- **Recoil**: 전역 상태 관리 (atoms, selectors, actions 구조)

### 결제 시스템
- **@portone/browser-sdk**: 0.0.9
- **@tosspayments/payment-widget-sdk**: 0.11.1
- **@tosspayments/tosspayments-sdk**: 2.2.1

### UI/UX 라이브러리
- **React Icons**: 5.3.0
- **React Modal**: 3.16.1
- **React Barcode**: 1.5.3
- **React Datepicker**: 4.21.0
- **React Paginate**: 8.2.0
- **React Spring**: 9.7.4 (애니메이션)

### 유틸리티
- **Axios**: 1.4.0 (HTTP 클라이언트)
- **Firebase**: 9.22.1
- **Crypto-js**: 4.1.1 (암호화)
- **XLSX**: 0.18.5 (엑셀 처리)

## 프로젝트 구조

```
src/
├── App.js                 # 메인 애플리케이션 컴포넌트
├── index.js              # 앱 진입점
├── components/           # 재사용 가능한 컴포넌트
│   ├── Admin/           # 관리자 전용 컴포넌트
│   │   ├── Auth/        # 관리자 인증
│   │   ├── Inventory/   # 재고 관리
│   │   ├── PointManage/ # 포인트 관리
│   │   └── Transaction/ # 거래 관리
│   ├── User/            # 사용자 컴포넌트
│   │   ├── Register/    # 회원가입
│   │   ├── Login/       # 로그인
│   │   ├── Update/      # 정보 수정
│   │   ├── UserMain/    # 사용자 메인
│   │   └── UserLog/     # 사용자 로그
│   ├── Modal/           # 모달 컴포넌트
│   └── Pg/             # 결제 관련 컴포넌트
├── pages/               # 페이지 컴포넌트
│   ├── Admin/          # 관리자 페이지
│   ├── User/           # 사용자 페이지
│   └── Pg/             # 결제 페이지
├── routers/            # 라우팅 설정
│   ├── MainRouter.tsx  # 메인 라우터
│   ├── AdminRouter.tsx # 관리자 라우터
│   └── UserRouter.tsx  # 사용자 라우터
├── contexts/           # Context API
│   ├── authContext.tsx # 인증 컨텍스트
│   └── loadingContext.jsx # 로딩 컨텍스트
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
│   ├── Axios.ts        # HTTP 설정
│   └── Date.js         # 날짜 유틸리티
├── constants/          # 상수 정의
├── assets/             # 정적 리소스
├── recoil/             # Recoil 상태 관리
│   ├── atoms/          # 상태 원자
│   ├── selectors/      # 선택자
│   └── actions/        # 액션
├── common/             # 공통 컴포넌트/스타일
└── lib/                # 라이브러리 설정
```

## 주요 기능

### 사용자 영역
- **회원가입/로그인**: 다단계 가입 프로세스, 인증 시스템
- **사용자 정보 관리**: 개인정보, 주소, 투자 정보 수정
- **포인트 시스템**: 포인트 충전, 사용 내역, 환불 기능
- **바코드 시스템**: QR/바코드 생성 및 스캔
- **공지사항**: 알림 및 공지사항 표시

### 관리자 영역
- **재고 관리**: 일별 재고, 재고 확인, 재고 차이 관리
- **거래 관리**: 결제, 충전, 거래 로그, 바코드 처리
- **포인트 관리**: 충전 내역, 결제 내역 관리
- **사용자 관리**: 사용자 목록 및 관리

### 결제 시스템
- **다중 결제**: Portone, TossPayments 연동
- **결제 리다이렉트**: 결제 완료 후 처리
- **결제 결과**: 결제 성공/실패 처리

## 개발 환경 설정

### 필수 요구사항
- Node.js 및 npm/yarn
- Git

### 설치 및 실행
```bash
# 클론
git clone http://gitlab.bsm-aripay.kr/DevCoop/o-ccount_front_v1.git

# 의존성 설치
yarn

# 개발 서버 실행 (포트 7000)
yarn start
```

### 스크립트
- `yarn start`: 개발 서버 시작 (포트 7000)
- `yarn build`: 프로덕션 빌드
- `yarn test`: 테스트 실행
- `yarn dev`: 개발 모드 실행

## Git 워크플로우

### 브랜치 전략
- **main**: 프로덕션 브랜치
- **develop**: 개발 브랜치
- **feature/***: 기능 개발 브랜치
- **hotfix/***: 긴급 수정 브랜치

### 커밋 컨벤션
- **FEAT**: 새로운 기능 추가
- **FIX**: 버그 수정
- **DOCS**: 문서 수정
- **STYLE**: 코드 스타일 수정
- **REFACTOR**: 코드 리팩토링
- **TEST**: 테스트 관련
- **CHORE**: 빌드/패키지 관리

## 아키텍처 특징

### 컴포넌트 구조
- **페이지별 분리**: Admin, User, Payment 영역으로 구분
- **재사용성**: 공통 컴포넌트와 모달 시스템
- **타입스크립트 도입**: 점진적 TypeScript 마이그레이션

### 상태 관리
- **Context API**: 인증 및 로딩 상태
- **Recoil**: 복잡한 전역 상태 관리
- **Local State**: 컴포넌트별 로컬 상태

### 스타일링
- **Styled Components**: 컴포넌트 단위 스타일링
- **테마 시스템**: 색상 및 스타일 상수 관리
- **반응형**: 모바일 우선 디자인

## 환경 설정

### 환경 변수
- `src/.env`: 개발 환경 설정
- `src/.env.product`: 프로덕션 환경 설정

### 빌드 설정
- **React Scripts**: CRA 기반 빌드
- **Babel**: JSX 및 TypeScript 변환
- **ESLint**: 코드 품질 관리

## 주의사항
- 혼재된 파일 확장자 (.js, .jsx, .ts, .tsx) - 점진적 마이그레이션 중
- Firebase 및 결제 시스템 API 키 관리 필요
- 포트 7000에서 실행되는 개발 서버

## API 엔드포인트 작성 규칙

### baseURL 확인 필수
API url을 작성하기 전에 반드시 `REACT_APP_API_URL` 환경변수와 `src/utils/Axios.ts`의 `baseURL`을 먼저 확인할 것.

- **현재 baseURL**: `http://192.168.5.163/api/v3/` (`.env`의 `REACT_APP_API_URL` 기준)
- baseURL이 이미 `/api/v3/`까지 포함되어 있으므로, axiosInstance 호출 시 url에는 **리소스 경로만** 작성해야 함

```ts
// ❌ 잘못된 예 — api/v3가 중복됨
url: 'api/v3/inquiries'   // → http://.../api/v3/api/v3/inquiries
url: 'v3/inquiries'       // → http://.../api/v3/v3/inquiries

// ✅ 올바른 예
url: 'inquiries'          // → http://.../api/v3/inquiries
url: 'inquiries/1'        // → http://.../api/v3/inquiries/1
```

새로운 API 함수를 작성할 때는 기존 파일(예: `src/components/User/UserMain/Notice/notices.ts`)의 url 패턴을 참고하여 검증할 것.