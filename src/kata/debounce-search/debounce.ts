interface Options {
    leading: boolean
}

export const debounce = <T>(fn: (p?: T) => void, delay: number, options: Options = { leading: false }) => {
    let timerId: number | null = null
    const fnn = (p?: T) => {
        if (options.leading) {
            if (timerId === null) {
                fn(p)
                timerId = 1
                setTimeout(() => {
                    timerId = null
                }, delay);
            }
            return
        }
        if (timerId) {
            clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            fn(p)
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
