export class Stack<T> {
    #arr: T[] = []

    push(v: T) {
        this.#arr.push(v)
        return this.getSize()
    }

    pop() {
        if (this.getSize() === 0) {
            throw new Error('빈 스택에서 값을 빼낼 수 없습니다')
        }
        return this.#arr.pop()
    }

    getSize() {
        return this.#arr.length
    }

    isEmpty() {
        return this.getSize() === 0
    }
}
