// FizzBuzz 카타 - 구현 파일
//
// 규칙(테스트가 요구하는 만큼만 조금씩 채워나가세요):
//   1. 숫자를 문자열로 반환한다        → fizzbuzz(1) === "1"
//   2. 3의 배수는 "Fizz"
//   3. 5의 배수는 "Buzz"
//   4. 15의 배수는 "FizzBuzz"
//
// TDD 원칙: 테스트가 시키기 전에는 아무것도 구현하지 마세요.
//           지금은 "가장 게으른" 구현으로 시작합니다.

export function fizzbuzz(n: number): string {
  if (n % 15 === 0) {
    return "FizzBuzz"
  }
  if (n % 3 === 0) {
    return "Fizz"
  }
  if (n % 5 === 0) {
    return "Buzz"
  }
  return String(n)
}
