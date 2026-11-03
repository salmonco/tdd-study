import { useDebounceCallback } from "./useDebounceCallback"

interface Props {
    onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch }: Props) => {
    const debounced = useDebounceCallback(onSearch, 300)
    return <input type="search" aria-label="검색" onChange={(e) => debounced(e.target.value)} />
}
