import { describe, it, expect } from 'vitest'
import { add } from './stringcalculator'

describe('stringCalculator - add', () => {
  // 여기에 테스트를 직접 작성하세요.
  //
  // 규칙:
  //   1. 요구사항(KATA.md) STEP 1부터 순서대로, 한 번에 하나씩.
  //   2. 먼저 실패하는 테스트(RED)를 쓰고 → npm test 로 빨간불 확인.
  //   3. 최소 코드로 통과(GREEN) → 리팩터 → 다음 STEP.
  //
  // 첫 테스트 예시 (STEP 1을 직접 이렇게 시작하면 됩니다):
  //
  // it('빈 문자열은 0을 반환한다', () => {
  //   expect(add('')).toBe(0)
  // })
  it('빈 문자열은 0을 반환한다', () => {
    expect(add('')).toBe(0)
  })
  it('숫자 하나는 숫자로 변환해 변환한다', () => {
    expect(add('1')).toBe(1)
    expect(add('42')).toBe(42)
  })
  it('숫자 두 개가 쉼표로 구분되어 인자로 오면, 두 수의 합을 반환한다', () => {
    expect(add('1,2')).toBe(3)
  })
  it('숫자 여러 개가 쉼표로 구분되어 인자로 오면, 각 숫자의 합을 반환한다', () => {
    expect(add('1,2,3,4,5')).toBe(15)
  })
  it('개행도 구분자로 여긴다', () => {
    expect(add('1\n2,3')).toBe(6)
  })
  it('맨 앞에 //구분자\n 형식의 커스텀 구분자를 추가할 시 구분자로 여긴다', () => {
    expect(add('//;\n1;2')).toBe(3)
    expect(add('//|\n4|5|6')).toBe(15)
    expect(add('//|\n1,2|3')).toBe(6)
  })
})
