import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe('useDebounce', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('초기값은 즉시 반환한다', () => {
        const { result } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        expect(result.current).toBe('a')
    })
    it('값이 바뀌어도 delay 전에는 이전 값이 저장된다', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'b' })
        vi.advanceTimersByTime(299)
        expect(result.current).toBe('a')
    })
    it('delay가 지나면 새 값이 저장된다', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'b' })
        act(() => vi.advanceTimersByTime(300))
        expect(result.current).toBe('b')
    })
    it('delay 안에 값이 여러 번 바뀌면 마지막 값만 저장된다', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'ab' })
        rerender({ value: 'abc' })
        act(() => vi.advanceTimersByTime(300))
        expect(result.current).toBe('abc')
    })
    it('delay 안에 값이 다시 바뀌면 이전 값의 타이머는 취소된다', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'ab' })
        act(() => vi.advanceTimersByTime(200))
        rerender({ value: 'abc' })
        act(() => vi.advanceTimersByTime(100))
        expect(result.current).toBe('a')
        act(() => vi.advanceTimersByTime(200))
        expect(result.current).toBe('abc')
    })
    it('같은 값으로 리렌더링되면 타이머를 새로 만들지 않는다', () => {
        const { rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        const before = vi.getTimerCount()
        rerender({ value: 'a' })
        expect(vi.getTimerCount()).toBe(before)
    })
    it('언마운트하면 타이머를 정리한다', () => {
        const { result, rerender, unmount } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'b' })
        unmount()
        expect(vi.getTimerCount()).toBe(0)
        act(() => vi.advanceTimersByTime(300))
        expect(result.current).toBe('a')
    })
    it('원본 함수의 인자 타입을 잃지 않는다', () => {
        const { rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'abc' })
        // @ts-expect-error number는 받을 수 없다
        rerender({ value: 123 })
        // @ts-expect-error boolean은 받을 수 없다
        rerender({ value: false })
    })
})
