import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "./SearchInput";

describe('SearchInput', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('검색창이 보인다', () => {
        render(<SearchInput onSearch={() => {}} />)
        expect(screen.getByRole('searchbox', { name: '검색' })).toBeInTheDocument()
    })
    it('입력해도 즉시 검색하지 않는다', async () => {
        const onSearch = vi.fn()
        render(<SearchInput onSearch={onSearch} />)
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const input = screen.getByRole('searchbox', { name: '검색' })
        await user.type(input, 'a')
        expect(onSearch).not.toHaveBeenCalled()
    })
    it('300ms 후에 검색한다', async () => {
        const onSearch = vi.fn()
        render(<SearchInput onSearch={onSearch} />)
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const input = screen.getByRole('searchbox', { name: '검색' })
        await user.type(input, 'a')
        act(() => vi.advanceTimersByTime(300))
        expect(onSearch).toHaveBeenCalledWith('a')
        expect(onSearch).toHaveBeenCalledTimes(1)
    })
    it('빠르게 세 글자를 치면 한 번만 검색한다', async () => {
        const onSearch = vi.fn()
        render(<SearchInput onSearch={onSearch} />)
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const input = screen.getByRole('searchbox', { name: '검색' })
        await user.type(input, 'abc')
        act(() => vi.advanceTimersByTime(300))
        expect(onSearch).toHaveBeenCalledWith('abc')
        expect(onSearch).toHaveBeenCalledTimes(1)
    })
})
