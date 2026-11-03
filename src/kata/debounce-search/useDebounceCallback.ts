import { useEffect, useMemo, useRef } from "react"
import { debounce } from "./debounce"

export const useDebounceCallback = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
    const fnRef = useRef(fn)
    const debounced = useMemo(() => {
        return debounce((...args: Parameters<F>) => {
            fnRef.current?.(...args)
        }, delay)
    }, [delay])

    useEffect(() => {
        fnRef.current = fn
    }, [fn])

    useEffect(() => {
        return () => {
            debounced.cancel()
        }
    }, [debounced])

    return debounced
}
