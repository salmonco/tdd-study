import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe('디바운스 검색', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.useRealTimers()
    })
    it('즉시 실행되지 않는다', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        expect(fn).not.toHaveBeenCalled()
    })
    it('ms가 지나면 실행된다', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalled()
    })
    it('ms가 덜 지나면 실행되지 않는다', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced()
        vi.advanceTimersByTime(299)
        expect(fn).not.toHaveBeenCalled()
    })
    it('인자를 그대로 넘긴다', () => {
        const fn = vi.fn()
        const debounced = debounce(fn, 300)
        debounced('hello')
        vi.advanceTimersByTime(300)
        expect(fn).toHaveBeenCalledWith('hello')
    })
})
