export class Stack<T> {
    #arr: T[] = []

    push(v: T) {
        this.#arr.push(v)
        return this.size
    }

    pop() {
        const last = this.#arr.pop()
        if (last === undefined) {
            throw new Error('빈 스택에서 값을 빼낼 수 없습니다')
        }
        return last
    }

    get size() {
        return this.#arr.length
    }

    isEmpty() {
        return this.size === 0
    }
}
