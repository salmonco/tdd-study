import { useEffect, useRef } from "react"
import { debounce } from "./debounce"

export const useDebounceCallback = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
    const debounced = useRef<ReturnType<typeof debounce>>(null)
    const fnRef = useRef(fn)
    if (debounced.current === null) {
        debounced.current = debounce((...args) => fnRef.current(...args), delay)
    }
    useEffect(() => {
        fnRef.current = fn
    }, [fn, delay])
    return debounced.current
}
