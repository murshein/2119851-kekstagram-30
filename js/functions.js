/* Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее.*/
function checkLength(text, maxLength) {
  return text.length <= maxLength;
}
checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);

//Функция для проверки, является ли строка палиндромом.
//Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
function checkIsPalindrome(string) {
  const lowRegStr = string.replaceAll(' ','').toLowerCase();
  const reverseStr = lowRegStr.split('').reverse().join('');
  return lowRegStr === reverseStr;
}

checkIsPalindrome('топот');
checkIsPalindrome('ДовОд');
checkIsPalindrome('Кекс');
checkIsPalindrome('Лёша на полке клопа нашёл ');

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN.
function parseNumber(string) {
  const str = string.toString();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const num = parseInt(str[i], 10);
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

parseNumber('2023 год');
parseNumber('ECMAScript 2022');
parseNumber('1 кефир, 0.5 батона');
parseNumber('агент 007');
parseNumber(2023);
parseNumber(-1);
parseNumber(1.5);
