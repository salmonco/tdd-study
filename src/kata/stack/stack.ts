const stack: number[] = []

export const push = (num: number) => {
    stack.push(num)
    return stack
}

export const pop = () => {
    return stack.pop()
}
