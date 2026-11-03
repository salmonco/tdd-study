import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number) => {
    const [result, setResult] = useState<T>(value)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setResult(value)
        }, delay)
        return () => {
            clearTimeout(timerId)
        }
    }, [value, delay])
    return result
}
