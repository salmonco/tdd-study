import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounceCallback } from "./useDebounceCallback";

describe('useDebounceCallback', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('즉시 실행되지 않는다', () => {
        const fn = vi.fn()
        const { result } = renderHook(
            ({ fn }) => useDebounceCallback(fn, 300),
            { initialProps: { fn } }
        )
        result.current()
        expect(fn).not.toHaveBeenCalled()
    })
    it('delay가 지나면 실행된다', () => {
        const fn = vi.fn()
        const { result } = renderHook(
            ({ fn }) => useDebounceCallback(fn, 300),
            { initialProps: { fn } }
        )
        result.current()
        vi.advanceTimersByTime(299)
        expect(fn).not.toHaveBeenCalled()
        vi.advanceTimersByTime(1)
        expect(fn).toHaveBeenCalledTimes(1)
    })
    it('인자를 그대로 넘긴다', () => {
        const fn = vi.fn()
        const { result } = renderHook(
            ({ fn }) => useDebounceCallback(fn, 300),
            { initialProps: { fn } }
        )
        result.current('a', 1)
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalledWith('a', 1)
    })
    it('리렌더링되어도 이전 호출과 묶여서 1번만 실행된다', () => {
        const fn = vi.fn()
        const { result, rerender } = renderHook(
            ({ fn }) => useDebounceCallback(fn, 300),
            { initialProps: { fn } }
        )
        result.current('a')
        vi.advanceTimersByTime(100)
        rerender({ fn })
        result.current('b')
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('b')
    })
    it('fn이 바뀌면 최신 fn이 실행된다', () => {
        const fn1 = vi.fn()
        const fn2 = vi.fn()
        const { result, rerender } = renderHook(
            ({ fn }) => useDebounceCallback(fn, 300),
            { initialProps: { fn: fn1 } }
        )
        result.current()
        rerender({ fn: fn2 })
        vi.advanceTimersByTime(300)
        expect(fn1).not.toHaveBeenCalled()
        expect(fn2).toHaveBeenCalledTimes(1)
    })
    it('언마운트하면 대기 중인 호출은 실행되지 않는다', () => {
        const fn = vi.fn()
        const { result, unmount } = renderHook(
            ({ fn }) => useDebounceCallback(fn, 300),
            { initialProps: { fn } }
        )
        result.current()
        unmount()
        vi.advanceTimersByTime(300)
        expect(fn).not.toHaveBeenCalled()
    })
    it('delay가 바뀌면 새 delay가 적용된다', () => {
        const fn = vi.fn()
        const { result, rerender } = renderHook(
            ({ delay }) => useDebounceCallback(fn, delay),
            { initialProps: { delay: 300 } }
        )
        rerender({ delay: 500 })
        result.current()
        vi.advanceTimersByTime(300)
        expect(fn).not.toHaveBeenCalled()
    })
})
