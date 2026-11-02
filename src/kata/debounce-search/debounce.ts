export const debounce = (fn: (p?: any) => void, delay: number) => {
    return (p?: any) => {
        setTimeout(() => {
            fn(p)
        }, delay);
    }
}
