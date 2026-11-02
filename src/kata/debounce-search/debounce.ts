export const debounce = <T>(fn: (p?: T) => void, delay: number) => {
    let timerId: number | null = null
    const fnn = (p?: T) => {
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
        }
    }
    return fnn
}
