interface Options {
    leading: boolean
}

export const debounce = <F extends (...args: any[]) => void>(fn: F, delay: number, options: Options = { leading: false }) => {
    let timerId: number | null = null
    let pending: (() => void) | null = null
    const debounced = (...args: Parameters<F>) => {
        if (options.leading && timerId === null) {
            fn(...args)
        }
        if (timerId !== null) {
            clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            timerId = null
            if (!options.leading) {
                fn(...args)
            }
        }, delay);
        if (!options.leading) {
            pending = () => fn(...args)
        }
    }
    debounced.cancel = () => {
        if (timerId !== null) {
            clearTimeout(timerId)
            timerId = null
        }
    }
    debounced.flush = () => {
        if (timerId !== null && pending !== null) {
            pending()
        }
        debounced.cancel()
    }
    return debounced
}
