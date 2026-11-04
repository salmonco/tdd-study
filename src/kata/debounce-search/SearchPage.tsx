import { SearchInput } from "./SearchInput"
import { useSearch } from "./useSearch"

const SearchPage = () => {
    const { onSearch, result, loading, error } = useSearch()
    return (
        <main>
            <SearchInput onSearch={onSearch} />
            {loading && <span>검색 중...</span>}
            {error && <span>검색에 실패했습니다. 다시 시도해 주세요</span>}
            <ul>{result.map((r) => <li key={r}>{r}</li>)}</ul>
        </main>
    )
}

export default SearchPage
