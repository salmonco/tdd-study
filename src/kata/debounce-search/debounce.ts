export const debounce = (fn: (p?: any) => void, delay: number) => {
    let timerId: number | null = null
    const fnn = (p?: any) => {
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
