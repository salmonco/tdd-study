class Node {
    constructor(v: number) {
        this.value = v 
        this.prev = null
        this.next = null
    }
}

/** 연결리스트로 구현한 큐 */
export class Queue {
    constructor() {
        this.init()
    }

    init() {
        this.front = null
        this.rear = null
        this.cnt = 0
    }

    push(num: number) {
        const node = new Node(num)
        if (this.cnt === 0) {
            this.front = node
            this.rear = node
        } else {
            const rear = this.rear
            rear.next = node
            node.prev = rear
            this.rear = node
        }
        this.cnt++
        return this.cnt
    }

    pop() {
        if (this.cnt === 0) {
            return null
        }
        const front = this.front
        if (this.cnt === 1) {
            this.init()
        } else {
            const next = front.next
            console.log(next)
            next.prev = null
            this.front = next
            this.cnt--
        }
        return front.value
    }
}
