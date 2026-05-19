# 🐾 반려동물 증상 AI — React Native (Expo)

babungee 수의사 데이터 기반 반려동물 증상 AI 챗봇 앱입니다.

---

## 📁 프로젝트 구조

```
pet-app-rn/
├── app/
│   ├── _layout.tsx       # Expo Router 루트 레이아웃
│   └── index.tsx         # 메인 채팅 화면
├── components/
│   ├── MessageBubble.tsx # 채팅 말풍선
│   ├── UrgencyCard.tsx   # 긴급도 카드
│   ├── TypingIndicator.tsx # 타이핑 애니메이션
│   └── PetSelector.tsx   # 반려동물 선택 버튼
├── constants/
│   ├── colors.ts         # 디자인 토큰
│   └── prompt.ts         # AI 시스템 프롬프트
├── hooks/
│   └── useChat.ts        # AI 호출 커스텀 훅
├── package.json
└── app.json
```

---

## 🚀 실행 방법

### 1. 사전 준비
```bash
# Node.js 18+ 설치 확인
node -v

# Expo CLI 설치
npm install -g expo-cli
```

### 2. 프로젝트 설치 및 실행
```bash
cd pet-app-rn
npm install
npx expo start
```

### 3. 기기에서 테스트
- **실제 기기**: [Expo Go 앱](https://expo.dev/client) 설치 후 QR 코드 스캔
- **시뮬레이터**: `i` (iOS) 또는 `a` (Android) 키 입력

---

## 🔑 API 키 설정 (중요!)

`constants/prompt.ts` 에서 API 키를 설정하세요:

```ts
export const API_KEY = 'sk-ant-...';  // 여기에 실제 키 입력
```

> ⚠️ **실제 배포 시 API 키를 앱에 직접 포함하지 마세요!**
> 백엔드 서버(Node.js, FastAPI 등)를 만들어 `/api/chat` 엔드포인트를 통해 호출하세요.
> API 키는 환경변수(`.env`)로 서버에서만 관리해야 합니다.

---

## 📱 앱스토어 배포 (EAS Build)

```bash
# EAS CLI 설치
npm install -g eas-cli

# 로그인
eas login

# 빌드 설정 초기화
eas build:configure

# iOS 빌드 (Apple Developer 계정 필요, $99/년)
eas build --platform ios

# Android 빌드 (Google Play 계정 필요, $25 일회성)
eas build --platform android
```

---

## 🔄 PWA → React Native 변환 대조표

| PWA (HTML/CSS)              | React Native               |
|-----------------------------|----------------------------|
| `<div>`, `<span>`           | `<View>`, `<Text>`         |
| CSS StyleSheet              | `StyleSheet.create()`      |
| `flex`, `gap` 등 CSS        | 동일한 이름의 RN 속성       |
| `<input>`, `<textarea>`     | `<TextInput>`              |
| `<button>`                  | `<TouchableOpacity>`       |
| `document.addEventListener` | React 이벤트 핸들러         |
| `fetch()`                   | `fetch()` (동일!)          |
| `localStorage`              | `AsyncStorage`             |
| CSS 애니메이션              | `Animated` API             |
