import { debounce } from "./debounce"

export const useDebounceCallback = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
    return debounce(fn, delay)
}
