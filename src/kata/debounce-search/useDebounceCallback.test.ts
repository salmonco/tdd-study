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
})
