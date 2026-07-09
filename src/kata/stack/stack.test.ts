import { describe, expect, it } from "vitest";
import { pop, push } from "./stack";

describe('stack 자료구조', () => {
    it('스택에 숫자를 넣는다', () => {
        expect(push(1)).toStrictEqual([1])
        expect(push(2)).toStrictEqual([1,2])
    })
    it('스택에서 숫자를 빼낸다', () => {
        expect(pop()).toBe(2)
        expect(pop()).toBe(1)
    })
})
