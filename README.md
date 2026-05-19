# 🐾 반려동물 증상 AI 상담 앱

반려동물 보호자가 반려동물의 증상을 설명하면, AI가 추가 질문을 통해 상황을 파악하고 간단한 진단과 함께 주변 동물병원을 추천해주는 모바일 앱입니다.

## ✨ 주요 기능

### 1. AI 기반 증상 상담
- Claude AI를 활용한 지능형 대화
- 보호자의 증상 설명에 따른 자동 추가 질문
- 반려동물 유형별 맞춤형 상담 (강아지, 고양이, 토끼, 기타)

### 2. 긴급도 판단 및 안내
- **저 (관찰 가능)**: 가정에서 모니터링 가능한 증상
- **중 (주의)**: 48-72시간 내 진료 권장
- **높음 (긴급)**: 즉시 병원 방문 필수

### 3. 주변 동물병원 추천
- Kakao Maps API를 통한 위치 기반 검색
- 현재 위치 기반 가까운 병원 리스트 제공
- 지도 보기 및 전화 걸기 기능

## 🚀 시작하기

### 필수 요구사항
- Node.js 16+ 및 npm
- Expo CLI (`npm install -g expo-cli`)
- Anthropic API Key
- Kakao Maps API Key

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/wookie1102/pet-symptom-ai.git
cd pet-symptom-ai
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정**
```bash
cp .env.example .env
```

`.env` 파일을 열어 다음을 설정하세요:
```
REACT_APP_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
REACT_APP_KAKAO_API_KEY=xxxxxxxxxxxxx
```

### API Key 발급

#### Anthropic API Key
1. [Anthropic Console](https://console.anthropic.com/)에서 계정 생성
2. API Key 발급
3. 사용량에 따른 요금제 선택

#### Kakao Maps API Key
1. [Kakao Developers](https://developers.kakao.com/)에서 앱 등록
2. REST API Key 발급
3. 위치 기반 서비스 활성화

### 실행하기

```bash
# 개발 서버 시작
npm start

# iOS 에뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android
```

## 📁 프로젝트 구조

```
pet-symptom-ai/
├── app/                          # Expo Router 페이지
│   ├── _layout.tsx              # 루트 레이아웃
│   └── index.tsx                # 메인 채팅 화면
├── components/                   # React Native 컴포넌트
│   ├── MessageBubble.tsx         # 메시지 말풍선
│   ├── TypingIndicator.tsx       # AI 입력 중 표시
│   ├── UrgencyCard.tsx           # 긴급도 카드
│   ├── PetSelector.tsx           # 반려동물 선택
│   ├── VetClinicList.tsx         # 병원 리스트
│   └── VetRecommendModal.tsx     # 병원 추천 모달
├── hooks/                        # 커스텀 훅
│   ├── useChat.ts               # AI 채팅 로직
│   ├── useLocation.ts           # 위치 정보 관리
│   └── useNearbyVets.ts         # 병원 검색 로직
├── constants/                    # 상수 및 설정
│   ├── colors.ts                # 색상 정의
│   └── prompt.ts                # AI 시스템 프롬프트
├── app.json                      # Expo 설정
├── package.json                  # 프로젝트 메타데이터
└── README.md                     # 프로젝트 문서
```

## 🔧 기술 스택

- **프레임워크**: React Native + Expo
- **UI**: React Native StyleSheet
- **AI**: Anthropic Claude API
- **위치 서비스**: Expo Location + Kakao Maps API
- **라우팅**: Expo Router
- **언어**: TypeScript

## ⚠️ 주의사항

- 이 앱의 AI 상담은 **실제 진료를 대체하지 않습니다**
- 긴급 상황 발생 시 **즉시 동물병원을 방문**하세요
- 정확한 진단을 위해 반려동물의 **증상을 최대한 자세히** 설명해주세요

## 📝 라이선스

MIT License

## 👨‍💻 개발자

- wookie1102

## 🤝 기여하기

버그 리포트, 기능 요청, 또는 기여는 항상 환영합니다!

Issues 탭에서 새로운 이슈를 생성해주세요.

---

**반려동물의 건강한 생활을 응원합니다! 🐾**
