# 카타: 디바운스 검색

하나의 요구사항을 **유틸 → 훅 → 컴포넌트** 3층으로 쌓아 올린다.
계층마다 테스트 도구가 달라지는 걸 몸으로 익히는 게 이 카타의 진짜 목적이다.

| 레벨 | 만드는 것 | 새로 배우는 도구 |
|---|---|---|
| 1 | `debounce(fn, ms)` | `vi.useFakeTimers()`, `vi.fn()` |
| 2 | `useDebounce(value, delay)` | `renderHook`, `act` |
| 3 | `<SearchInput />` | `render`, `user-event`, `findBy*` |

**핵심 규칙**: 한 번에 STEP 하나. 항상 RED → GREEN → REFACTOR.
앞 STEP 요구사항을 미리 구현하지 말 것. 테스트가 시키는 만큼만 짠다.

---

## LEVEL 1 — `debounce(fn, ms)`

"마지막 호출로부터 `ms`가 지나야 실제로 실행된다."

지금까지의 카타는 전부 동기 함수였다. 여기서는 **시간이 입력값이 된다.**
실제로 300ms를 기다리는 테스트는 느리고 불안정하니, 가짜 타이머로 시간을 직접 조작한다.

```ts
beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

it('...', () => {
    const fn = vi.fn()              // 스파이: 몇 번, 어떤 인자로 불렸는지 기록
    const debounced = debounce(fn, 300)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)     // 시간을 300ms 앞으로 감는다
    expect(fn).toHaveBeenCalledTimes(1)
})
```

### STEP 1 — 즉시 실행되지 않는다
- `debounced()`를 호출해도 `fn`은 아직 불리지 않는다.

### STEP 2 — ms가 지나면 실행된다
- `debounced()` 후 `300ms` 경과 → `fn`이 정확히 1번 불린다.
- `299ms`에서는 아직 안 불린다. (경계값도 테스트로 못박을 것)

### STEP 3 — 인자를 그대로 넘긴다
- `debounced('hello')` → `fn`이 `'hello'`로 불린다.
- `toHaveBeenCalledWith('hello')`

### STEP 4 — 연속 호출하면 마지막 것만 (타이머 리셋)
- `debounced('a')` → 100ms → `debounced('b')` → 100ms → `debounced('c')` → 300ms
- `fn`은 **1번만**, `'c'`로 불린다.
- 이게 디바운스의 존재 이유다. 여기서 처음으로 "이전 타이머 취소"가 필요해진다.

### STEP 5 — 실행된 뒤에는 다시 시작한다
- `debounced('a')` → 300ms (실행됨) → `debounced('b')` → 300ms
- `fn`은 2번 불린다. (한 번 실행하고 죽어버리면 안 됨)

### STEP 6 — `cancel()`
- `debounced()` → 100ms → `debounced.cancel()` → 300ms
- `fn`은 한 번도 안 불린다.

### 도전 과제
- **STEP 7 — 타입**: `debounce`가 원본 함수의 인자 타입을 잃지 않게 하기.
  `debounce((n: number) => {}, 300)('문자열')`이 컴파일 에러가 나야 한다.
  힌트: 제네릭 + `Parameters<T>`
- **STEP 8 — `leading` 옵션**: `{ leading: true }`면 첫 호출은 즉시 실행하고, 이후 `ms` 동안은 무시한다.
- **STEP 9 — `flush()`**: 대기 중인 호출을 즉시 실행시킨다.

---

## LEVEL 2 — `useDebounce(value, delay)`

"값이 바뀌어도 `delay` 동안 조용하면 그때 새 값을 내놓는다."

```ts
const debouncedKeyword = useDebounce(keyword, 300)
```

훅은 React 렌더링 사이클 안에서만 살아있으므로 그냥 호출할 수 없다. `renderHook`으로 감싼다.

```ts
const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    { initialProps: { value: 'a' } }
)

expect(result.current).toBe('a')

rerender({ value: 'b' })
expect(result.current).toBe('a')          // 아직 이전 값

act(() => { vi.advanceTimersByTime(300) })  // 시간을 감으면 setState가 일어난다 → act 필요
expect(result.current).toBe('b')
```

> **`act`가 왜 필요한가**: `advanceTimersByTime`이 타이머 콜백을 실행하고, 그 안에서 `setState`가 불린다.
> React는 상태 변경 후 리렌더링을 해야 하는데, `act`로 감싸야 "이 블록이 끝나면 리렌더링까지 다 끝내라"고
> React에게 알려줄 수 있다. 안 감싸면 경고가 뜨고 `result.current`가 옛날 값을 가리킨다.
> 이 경고를 보게 되면 무시하지 말고, 왜 뜨는지 이해하고 넘어갈 것.

### STEP 1 — 초기값은 즉시 반환한다
- `useDebounce('a', 300)` → 첫 렌더에서 바로 `'a'`.

### STEP 2 — 값이 바뀌어도 delay 전에는 이전 값
- `'a'` → `'b'`로 rerender → 299ms 시점에도 여전히 `'a'`.

### STEP 3 — delay가 지나면 새 값
- 300ms 후 `'b'`.

### STEP 4 — delay 안에 여러 번 바뀌면 마지막 값만
- `'a'` → `'ab'` → `'abc'`를 빠르게 → 300ms 후 `'abc'`.
- 중간값 `'ab'`는 한 번도 노출되지 않는다.

### STEP 5 — 언마운트하면 타이머를 정리한다
- 값 변경 직후 `unmount()` → 시간을 감아도 `setState`가 불리지 않는다.
- 정리를 안 하면 "unmounted 컴포넌트에 setState" 경고가 뜨고, 실무에선 메모리 누수가 된다.
- `useEffect`의 cleanup 함수로 해결한다.

### 도전 과제
- **STEP 6**: `useDebouncedCallback(fn, delay)` — 값이 아니라 콜백을 디바운스한다.
  LEVEL 1의 `debounce`를 재사용할 수 있을까? `fn`이 매 렌더마다 새로 만들어지는 문제를 어떻게 할까?

---

## LEVEL 3 — `<SearchInput onSearch={} />`

여기서부터는 **"코드가 어떻게 동작하는가"가 아니라 "사용자가 무엇을 하고 무엇을 보는가"를 테스트한다.**
`useState`가 어떻게 생겼는지, `useDebounce`를 쓰는지는 테스트가 몰라야 한다.
내부 구현을 바꿔도 테스트가 안 깨지면 잘 쓴 것이다.

### ⚠️ 함정: `user-event` + 가짜 타이머

`user-event`는 내부적으로 실제 타이머를 쓴다. `vi.useFakeTimers()`를 켜두면 **타이핑이 영원히 끝나지 않고 테스트가 멈춘다.**
반드시 이렇게 연결해줘야 한다:

```ts
const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
```

이 한 줄 때문에 30분 날리는 사람이 많다. 미리 알고 시작하자.

### STEP 1 — 검색창이 보인다
- 접근 가능한 이름으로 찾을 수 있어야 한다.
- `screen.getByRole('searchbox', { name: '검색' })`
- CSS 클래스나 `data-testid`로 찾지 말 것. **사용자가 화면에서 찾는 방식대로** 찾는다.

### STEP 2 — 타이핑해도 즉시 검색하지 않는다
- `await user.type(input, 'a')` → `onSearch`는 아직 불리지 않는다.

### STEP 3 — 300ms 후에 검색한다
- 타이핑 후 시간을 감으면 `onSearch`가 `'a'`로 1번 불린다.

### STEP 4 — 빠르게 세 글자를 치면 한 번만 검색한다
- `await user.type(input, 'abc')` → 300ms → `onSearch`는 **1번**, `'abc'`로.
- 이 카타의 클라이맥스. 네트워크 요청 3번이 1번으로 줄어드는 순간이다.

### STEP 5 — 빈 문자열이면 검색하지 않는다
- 다 지우면 `onSearch`가 불리지 않는다. (혹은 결과를 초기화한다 — 어느 쪽이 맞는지 테스트로 정하라)

### STEP 6 — 검색 결과를 보여준다
- 이제 `onSearch` 대신 비동기 `search(keyword)` 함수를 주입받는다고 하자.
- 결과가 도착하면 목록이 렌더된다: `expect(await screen.findByText('사과')).toBeInTheDocument()`
- `getBy`는 **지금 당장** 없으면 실패, `findBy`는 **나타날 때까지 기다린다**. 비동기엔 `findBy`.

### STEP 7 — 로딩 상태
- 검색 중에는 "검색 중..."이 보인다.
- 결과가 오면 사라진다: `expect(screen.queryByText('검색 중...')).not.toBeInTheDocument()`
- `queryBy`는 **없을 수도 있는 것**을 찾을 때만 쓴다. (없으면 에러 대신 `null`)

### STEP 8 — 에러 상태
- `search`가 reject하면 에러 메시지가 보인다.

### 도전 과제 (실무 난이도)
- **STEP 9 — 경쟁 상태(race condition)**:
  `'a'` 검색 요청이 나갔는데 응답이 늦고, 그 사이 `'ab'` 요청이 나가서 먼저 도착했다.
  그 뒤 `'a'`의 응답이 도착하면? **화면에 `'a'`의 결과가 덮어씌워진다.** 실무에서 실제로 터지는 버그다.
  - 테스트: `search`를 수동으로 resolve할 수 있는 mock으로 만들고, 응답 순서를 뒤집어라.
  - 해결: 마지막 요청의 응답만 반영하거나(요청 ID/시퀀스), `AbortController`로 이전 요청을 취소한다.
  - **이 버그는 테스트를 먼저 써보지 않으면 존재하는 줄도 모른다.** TDD가 설계 도구인 이유.

---

## 진행 팁

- **레벨을 건너뛰지 말 것.** LEVEL 1의 `debounce`가 LEVEL 2에서 재사용될 수도, 안 될 수도 있다.
  직접 부딪혀서 "훅에선 왜 그냥 못 쓰지?"를 겪는 게 이 카타의 절반이다.
- **`vi.fn()`은 스파이다.** `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`로 "몇 번, 어떤 인자로" 불렸는지 검증한다.
  디바운스 테스트는 결국 "**안** 불렸음"을 증명하는 게 핵심이라, `not.toHaveBeenCalled()`를 많이 쓰게 된다.
- **뮤테이션 테스트**: GREEN이 되면 구현에서 아무 줄이나 하나 지워보고 테스트를 돌려라.
  여전히 초록불이면 그 줄은 테스트가 요구하지 않은 코드다 — 테스트가 부족하거나, 그 코드가 불필요하거나.
  (Queue 카타에서 `#rear = null`로 이미 겪은 그것)
- **GREEN이 되면 커밋.** 초록불 = 안전 지점.

실행: `npm test` (watch)
