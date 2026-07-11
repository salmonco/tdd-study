class Node<T> {
    value: T
    next: Node<T> | null

    constructor(v: T) {
        this.value = v 
        this.next = null
    }
}

/** 단방향 연결리스트로 구현한 큐 */
export class Queue<T> {
    #front: Node<T> | null
    #rear: Node<T> | null
    #size: number
    
    constructor() {
        this.#front = null
        this.#rear = null
        this.#size = 0
    }

    enqueue(v: T) {
        const node = new Node<T>(v)
        if (this.#rear === null) {
            this.#front = node
        } else {
            const rear = this.#rear
            rear.next = node
        }
        this.#rear = node
        this.#size++
        return this.#size
    }

    dequeue() {
        const front = this.#front
        if (front === null) {
            throw new Error('빈 큐에서는 값을 빼낼 수 없습니다')
        }
        if (front.next === null) {
            this.#rear = null
        }
        this.#front = front.next
        this.#size--
        return front.value
    }

    isEmpty() {
        return this.#size === 0
    }

    get size() {
        return this.#size
    }
}
