interface Options {
    leading: boolean
}

export const debounce = <T>(fn: (p?: T) => void, delay: number, options: Options = { leading: false }) => {
    let timerId: number | null = null
    const fnn = (p?: T) => {
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
    }
    fnn.cancel = () => {
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
    }
    return fnn
}
