interface Options {
    leading: boolean
}

export const debounce = <T>(fn: (p?: T) => void, delay: number, options: Options = { leading: false }) => {
    let timerId: number | null = null
    let pending: (() => void) | null = null
    const debounced = (p?: T) => {
        if (options.leading && timerId === null) {
            fn(p)
        }
        if (timerId !== null) {
            clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            timerId = null
            if (!options.leading) {
                fn(p)
            }
        }, delay);
        if (!options.leading) {
            pending = () => fn(p)
        }
    }
    debounced.cancel = () => {
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
    }
    debounced.flush = () => {
        if (timerId && pending !== null) {
            pending()
        }
        debounced.cancel()
    }
    return debounced
}
