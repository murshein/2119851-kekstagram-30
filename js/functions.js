/* Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее.*/
function checkLength(text, maxLength) {
  return text.length <= maxLength;
}

//Функция для проверки, является ли строка палиндромом.
//Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
function checkIsPalindrome(string) {
  let lowRegStr = string.replaceAll(' ','').toLowerCase();
  let reverseStr = lowRegStr.split('').reverse().join('');
  return lowRegStr === reverseStr;
}

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN.
function parseNumber(string) {
  let str = string.toString();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    let num = parseInt(str[i], 10);
    if (!Number.isNaN(num)) {
      result += num;
    }
  }
  if (result !== 'undefined') {
    return parseInt(result, 10);
  } else {
    return NaN;
  }
}
