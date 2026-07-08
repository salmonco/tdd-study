// String Calculator 카타 — 구현 파일
//
// 테스트가 RED가 되면, 그 테스트를 통과시키는 "최소한의" 코드만 여기에 작성하세요.
// 미리 앞서가지 말 것! 지금 켜져 있는 테스트 하나만 초록불로 만들면 됩니다.

export function add(numbers: string) {
  if (numbers === '') return 0
  let customSeparator = ''
  if (numbers.startsWith('//')) {
    customSeparator = numbers[2]
  }
  let csv = numbers.replace('//', '').replaceAll('\n', ',')
  if (customSeparator !== '') {
    csv = csv.replaceAll(customSeparator, ',')
  }
  const numArr = csv.split(',').map(Number)
  // console.log({customSeparator, csv, numArr})
  const sum = numArr.reduce((acc, cur) => acc + cur, 0)
  return sum
}
