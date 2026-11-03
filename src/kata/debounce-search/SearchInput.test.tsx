import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchInput } from "./SearchInput";

describe('SearchInput', () => {
    it('검색창이 보인다', () => {
        render(<SearchInput />)
        expect(screen.getByRole('searchbox', { name: '검색' })).toBeInTheDocument()
    })
})
