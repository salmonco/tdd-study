import { useEffect, useRef, useState } from "react"

export const useDebounce = <T>(value: T, delay: number) => {
    const [result, setResult] = useState<T>(value)
    const timerId = useRef<number | null>(null)
    useEffect(() => {
        if (timerId.current !== null) {
            clearTimeout(timerId.current)
        }
        timerId.current = setTimeout(() => {
            setResult(value)
            timerId.current = null
        }, delay)
        return () => {
            if (timerId.current !== null) {
                clearTimeout(timerId.current)
                timerId.current = null
            }
        }
    }, [value, delay])
    return result
}
