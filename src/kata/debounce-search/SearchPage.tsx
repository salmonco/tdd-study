import { SearchInput } from "./SearchInput"
import { useSearch } from "./useSearch"

const SearchPage = () => {
    const { search, result, loading, error } = useSearch()
    return (
        <main>
            <SearchInput onSearch={search} />
            {loading && <span>검색 중...</span>}
            {error && <span>검색에 실패했습니다</span>}
            <ul>{result.map((r) => <li key={r}>{r}</li>)}</ul>
        </main>
    )
}

export default SearchPage
