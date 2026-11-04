import { useState } from "react"
import { search } from "./searchApi"

export const useSearch = () => {
    const [result, setResult] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const onSearch = async (value: string) => {
        setLoading(true)
        setError(null)
        try {
            const res = await search(value)
            setResult(res)
        } catch (e) {
            setError((e as Error))
        } finally {
            setLoading(false)
        }
    }
    return { onSearch, result, loading, error }
}
