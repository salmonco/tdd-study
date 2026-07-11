import { beforeEach, describe, expect, it } from "vitest";
import { Stack } from "./stack";

describe('stack 자료구조', () => {
    let stack: Stack<number>

    beforeEach(() => {
        stack = new Stack()
    })

    it('스택에 값을 빼내면 가장 늦게 넣은 값이 빠진다', () => {
        stack.push(1)
        stack.push(2)
        expect(stack.pop()).toBe(2)
    })

    it('빈 스택에서 값을 빼내면 에러를 던진다', () => {
        expect(() => stack.pop()).toThrow('빈 스택에서 값을 빼낼 수 없습니다')
    })

    it('스택에서 값을 넣으면 길이를 반환한다', () => {
        expect(stack.push(1)).toBe(1)
        expect(stack.push(2)).toBe(2)
    })

    it('getSize를 호출하면 스택의 길이를 반환한다', () => {
        expect(stack.getSize()).toBe(0)
        stack.push(1)
        expect(stack.getSize()).toBe(1)
    })

    it('isEmpty를 호출하면 스택이 비었는지 여부를 반환한다', () => {
        expect(stack.isEmpty()).toBe(true)
        stack.push(1)
        expect(stack.isEmpty()).toBe(false)
    })
})
