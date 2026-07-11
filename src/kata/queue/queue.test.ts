import { beforeEach, describe, expect, it } from "vitest";
import { Queue } from "./queue";


describe('queue 자료구조', () => {
    let queue: Queue<number>

    beforeEach(() => {
        queue = new Queue()
    })

    it('큐에 값을 넣으면 길이를 반환한다', () => {
        expect(queue.enqueue(1)).toBe(1)
        expect(queue.enqueue(2)).toBe(2)
    })

    it('큐에 값을 빼내면 먼저 들어온 것이 먼저 빠진다', () => {
        queue.enqueue(1)
        queue.enqueue(2)
        expect(queue.dequeue()).toBe(1)
        expect(queue.dequeue()).toBe(2)
    })

    it('큐가 비었는데 값을 빼내면 에러륻 던진다', () => {
        expect(() => queue.dequeue()).toThrow('빈 큐에서는 값을 빼낼 수 없습니다')
    })

    it('큐를 다 비운 뒤 다시 넣어도 정상 동작한다', () => {
        queue.enqueue(1)
        queue.dequeue()
        queue.enqueue(2)
        expect(queue.dequeue()).toBe(2)
    })

    it('큐가 비었으면 true 반환, 아니면 false 반환한다', () => {
        expect(queue.isEmpty()).toBe(true)
        queue.enqueue(1)
        expect(queue.isEmpty()).toBe(false)
    })

    it('큐의 사이즈에 해당하는 숫자를 반환한다', () => {
        expect(queue.size).toBe(0)
        queue.enqueue(1)
        expect(queue.size).toBe(1)
        queue.enqueue(2)
        expect(queue.size).toBe(2)
    })
})
