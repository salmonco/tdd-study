import { describe, it, expect } from 'vitest'
import { fizzbuzz } from './fizzbuzz'

describe('fizzbuzz', () => {
  // ── STEP 1 (RED가 이미 켜져 있음) ──────────────────────────────
  // 이 테스트를 통과시키는 "최소한의" 코드를 fizzbuzz.ts에 작성하세요.
  it('숫자를 문자열로 반환한다', () => {
    expect(fizzbuzz(1)).toBe('1')
    expect(fizzbuzz(2)).toBe('2')
  })

  // ── STEP 2 ────────────────────────────────────────────────────
  // STEP 1이 초록불(GREEN)이 되면 아래 it.skip을 it으로 바꿔 RED를 만드세요.
  it('3의 배수는 Fizz', () => {
    expect(fizzbuzz(3)).toBe('Fizz')
    expect(fizzbuzz(6)).toBe('Fizz')
  })

  // ── STEP 3 ────────────────────────────────────────────────────
  it('5의 배수는 Buzz', () => {
    expect(fizzbuzz(5)).toBe('Buzz')
    expect(fizzbuzz(10)).toBe('Buzz')
  })

  // ── STEP 4 ────────────────────────────────────────────────────
  it('15의 배수는 FizzBuzz', () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz')
    expect(fizzbuzz(30)).toBe('FizzBuzz')
  })
})
