import { useRef } from "react"
import { debounce } from "./debounce"

export const useDebounceCallback = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
    const debounced = useRef<ReturnType<typeof debounce>>(null)
    if (debounced.current === null) {
        debounced.current = debounce(fn, delay)
    }
    return debounced.current
}
