const FRUITS = ['사과', '사과주스', '사과잼', '바나나', '바나나우유', '딸기', '딸기잼']

export const search = (keyword: string): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(FRUITS.filter((f) => f.includes(keyword))), 500)
    })
}
