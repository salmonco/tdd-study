import { describe, expect, it } from "vitest";
import { Queue } from "./queue";


describe('queue 자료구조', () => {
    const queue = new Queue()

    it('큐에 숫자를 넣는다. 길이 반환', () => {
        expect(queue.push(1)).toBe(1)
        expect(queue.push(2)).toBe(2)
    })
    it('큐에 숫자를 빼낸다', () => {
        expect(queue.pop()).toBe(1)
        expect(queue.pop()).toBe(2)
    })
    it('큐가 비었는데 pop하면 null을 반환한다', () => {
        expect(queue.pop()).toBeNull()
    })
})
