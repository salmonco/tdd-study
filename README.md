# TDD 연습 가이드

> 테스트를 먼저 쓰고, 그 테스트를 통과하는 최소한의 코드만 짜고, 그다음 정리한다.

## 사이클: Red → Green → Refactor
1. 🔴 **Red**: 실패하는 테스트를 하나 쓴다. (아직 없는 기능을 "이렇게 동작했으면" 하고 선언)
2. 🟢 **Green**: 그 테스트를 통과시키는 **가장 게으른** 코드를 쓴다. (예쁠 필요 없음)
3. 🔵 **Refactor**: 테스트가 초록불인 상태를 유지하며 코드를 정리한다.

## 실행 방법
```bash
npm test          # watch 모드: 파일 저장할 때마다 자동 재실행 (TDD엔 이게 기본)
npm run test:run  # 한 번만 실행
```

## 첫 카타: FizzBuzz
- 구현: `src/kata/fizzbuzz.ts`
- 테스트: `src/kata/fizzbuzz.test.ts`

## 다음에 해볼 카타
- **String Calculator**: 빈 문자열, 구분자, 여러 숫자로 점진 확장
- **Stack / Queue**: 자료구조를 테스트로 설계
- React 컴포넌트
- Reack Hook

## VSCode AI 자동완성 끄는 법

1. Cmd + Shift + P
2. Preferences: Open User Setting (JSON) 열기
3. settings.json에 `"editor.inlineSuggest.enabled": false` 추가
