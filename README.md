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
npm run build     # 타입 체크 포함
npm run dev       # 브라우저로 확인 (http://localhost:5173)
```

## 카타

| 카타 | 주제 | 상태 |
|---|---|---|
| [FizzBuzz](src/kata/fizzbuzz) | TDD 사이클 감 잡기 | ✅ |
| [String Calculator](src/kata/string-calculator) | 요구사항을 단계적으로 쌓기 · [KATA.md](src/kata/string-calculator/KATA.md) | ✅ |
| [Stack](src/kata/stack) | 자료구조 · 테스트 독립성 · 상태 변화 검증 | ✅ |
| [Queue](src/kata/queue) | 자료구조 · 타입 내로잉 · 불변식 | ✅ |
| [디바운스 검색](src/kata/debounce-search) | **유틸 → 훅 → 컴포넌트 3층** · [KATA.md](src/kata/debounce-search/KATA.md) | 🔄 진행 중 (STEP 9 경쟁 상태 남음) |

## 지금까지 얻은 교훈

- **테스트는 서로 독립적이어야 한다.** 모듈 전역 상태나 `describe` 스코프의 공유 객체를 쓰면
  앞 테스트가 남긴 상태에 의존하게 되고, 테스트 순서가 숨은 입력값이 된다. → `beforeEach`로 매번 새로 만든다.
- **Refactor 단계를 건너뛰지 말 것.** 초록불이 뜬 뒤 "지금 코드에 필요 없는 게 뭐지?"를 한 번 묻는다.
  (Queue에서 아무도 읽지 않는 `prev` 포인터가 그렇게 살아남아 있었다)
- **반환값만 보지 말고 상태 변화도 검증하라.** `pop`처럼 값을 반환하면서 동시에 상태를 바꾸는
  메서드는 둘 다 봐야 한다. `pop()`을 한 번만 호출해서 반환값만 확인하면,
  **값을 꺼내기만 하고 제거하지 않는 스택**도 테스트를 통과해버린다. (두 번 꺼내서 순서를 확인할 것)
- **타입 에러를 제대로 없애면 설계가 좋아진다.** 컴파일러가 "possibly null"이라고 할 때
  `!`나 형식적인 `if (x)`로 입을 막지 말 것. 그건 **테스트로 도달할 수 없는 죽은 분기**를 만든다.
  진짜 원인은 대개 "진실의 원천이 둘"이라는 설계 문제다. (Queue의 `#size` vs `#front`/`#rear`)
- **가드와 반환을 합치면 타입이 깨끗해진다.** 빈 컬렉션에서 throw 하기로 했으면 반환 타입도 `T`여야 한다.
  `Array#pop()`의 `T | undefined`가 그대로 새어나오면, throw를 넣은 의미가 없어진다. (Stack의 `pop()`)
- **뮤테이션 테스트로 자가진단.** 구현에서 아무 줄이나 하나 지우거나 바꾸고 테스트를 돌려보라.
  여전히 초록불이면 그 줄은 테스트가 요구하지 않은 코드다 — 테스트가 부족하거나, 그 코드가 불필요하거나.
  (Queue의 `#rear = null`, Stack의 `pop`이 그렇게 걸렸다)
- **가짜 데이터는 입력과 다른 값으로.** 검색어 `'사과'`에 결과 `'사과'`를 돌려주면,
  결과를 보여주는 구현과 검색어를 그대로 찍는 구현을 테스트가 구분하지 못한다.
  에러 메시지도 화면 문구와 다르게 줘야 "고정 문구를 띄운다"는 걸 검증할 수 있다. (디바운스 검색)
- **비동기 응답은 시간으로 흉내 내지 말고 직접 끝낸다.** `Promise.withResolvers()`로 만든 Promise를
  `mockReturnValue`로 넘기고, 원하는 순간에 `resolve`/`reject`한다. 디바운스 대기 시간과
  응답 대기 시간을 섞으면 "검색 중"이 언제인지 테스트가 엉뚱하게 가정하게 된다. (로딩 상태)
- **`mockReturnValue`는 매번 같은 값을 돌려준다.** 한 번 reject된 Promise는 다시 resolve되지 않는다.
  호출마다 다른 응답이 필요하면 `mockRejectedValueOnce().mockResolvedValueOnce()`처럼 `Once`를 쓴다.
- **테스트를 쓰기 어색하면 설계를 다시 볼 신호다.** 결과 표시 테스트를 쓰려니 `SearchInput`의
  `onSearch`가 콜백에서 "결과를 돌려주는 함수"로 바뀌어야 했다 → 결과는 `SearchPage`로 분리.
  라우트에 붙는 페이지에 테스트용 prop을 뚫는 대신 API 모듈을 import하고 테스트에서 `vi.mock`한다.
- **구현을 바꿔도 안 깨지는 테스트가 잘 쓴 테스트다.** `useSearch` 훅으로 분리할 때
  `SearchPage` 테스트를 하나도 안 고쳤는데 그대로 통과했다. 화면 기준으로 검증했기 때문이다.
- **`getByText`는 기본이 완전 일치(`exact: true`)다.** 한 엘리먼트의 직속 텍스트 전체가 같아야 한다.
  `<p>사과주스, 사과잼</p>`에서는 `'사과주스'`를 못 찾는다. 있어야 하는 건 `getBy`,
  없어야 하는 건 `queryBy`로 확인한다. (`queryBy`로 존재를 확인하면 실패 메시지가 `null`뿐이다)

## 팁: VSCode AI 자동완성 끄는 법

1. Cmd + Shift + P
2. Preferences: Open User Setting (JSON) 열기
3. settings.json에 `"editor.inlineSuggest.enabled": false` 추가
