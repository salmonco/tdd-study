import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchPage from "./SearchPage";
import { search } from "./searchApi";

vi.mock('./searchApi')

describe('SearchPage', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('검색 결과를 보여준다', async () => {
        vi.mocked(search).mockResolvedValue(['사과주스', '사과잼'])
        render(<SearchPage />)
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const input = screen.getByRole('searchbox', { name: '검색' })
        await user.type(input, '사과')
        await act(() => vi.advanceTimersByTimeAsync(300))
        expect(screen.getByText('사과주스')).toBeInTheDocument()
    })
    it('로딩 상태를 보여준다', async () => {
        const { promise, resolve } = Promise.withResolvers<string[]>()
        vi.mocked(search).mockReturnValue(promise)
        render(<SearchPage />)
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const input = screen.getByRole('searchbox', { name: '검색' })
        await user.type(input, '사과')
        await act(() => vi.advanceTimersByTimeAsync(300))
        expect(screen.queryByText('검색 중...')).toBeInTheDocument()
        await act(async () => resolve(['사과주스']))
        expect(screen.queryByText('검색 중...')).not.toBeInTheDocument()
    })
    it('에러 상태를 보여준다', async () => {
        const { promise, reject } = Promise.withResolvers<string[]>()
        vi.mocked(search).mockReturnValue(promise)
        render(<SearchPage />)
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
        const input = screen.getByRole('searchbox', { name: '검색' })
        await user.type(input, '사과')
        await act(() => vi.advanceTimersByTimeAsync(300))
        expect(screen.queryByText('검색에 실패했습니다')).not.toBeInTheDocument()
        await act(async () => reject(new Error('검색에 실패했습니다')))
        expect(screen.queryByText('검색에 실패했습니다')).toBeInTheDocument()
    })
})
