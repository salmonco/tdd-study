import { useDebounceCallback } from "./useDebounceCallback"

interface Props {
    onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch }: Props) => {
    const debounced = useDebounceCallback(onSearch, 300)

    const onChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        debounced(e.target.value)
        if (e.target.value === '') {
            debounced.cancel()
        }
    }

    return <input type="search" aria-label="검색" onChange={onChange} />
}
