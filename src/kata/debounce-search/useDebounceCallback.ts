import { useEffect, useRef } from "react"
import { debounce } from "./debounce"

export const useDebounceCallback = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
    const debounced = useRef<ReturnType<typeof debounce<F>> | null>(null)
    const fnRef = useRef<F | null>(fn)
    if (debounced.current === null) {
        debounced.current = debounce((...args: Parameters<F>) => {
            if (fnRef.current !== null) {
                fnRef.current(...args)
            }
        }, delay)
    }
    useEffect(() => {
        fnRef.current = fn
    }, [fn, delay])
    return debounced.current
}
