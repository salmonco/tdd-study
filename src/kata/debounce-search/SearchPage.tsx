import { useState } from "react"
import { search } from "./searchApi"
import { SearchInput } from "./SearchInput"

const SearchPage = () => {
    const [result, setResult] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const onSearch = async (value: string) => {
        setLoading(true)
        try {
            const res = await search(value)
            setResult(res)
        } catch (e) {
            setErrorMessage((e as Error).message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <main>
            <SearchInput onSearch={onSearch} />
            {loading && <span>검색 중...</span>}
            {errorMessage && <span>검색에 실패했습니다</span>}
            <ul>{result.map((r) => <li>{r}</li>)}</ul>
        </main>
    )
}

export default SearchPage
