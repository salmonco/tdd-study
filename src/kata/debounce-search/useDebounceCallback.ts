import { useEffect, useRef } from "react"
import { debounce } from "./debounce"

export const useDebounceCallback = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
    const debounced = useRef<ReturnType<typeof debounce<F>> | null>(null)
    const fnRef = useRef<F | null>(fn)
    const delayRef = useRef(delay)
    if (debounced.current === null || delayRef.current !== delay) {
        debounced.current?.cancel()
        debounced.current = debounce((...args: Parameters<F>) => {
            if (fnRef.current !== null) {
                fnRef.current(...args)
            }
        }, delay)
        delayRef.current = delay
    }
    useEffect(() => {
        fnRef.current = fn
        return () => {
            fnRef.current = null
        }
    }, [fn])
    return debounced.current
}
