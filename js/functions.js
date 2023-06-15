//Проверяет максимальную длину строки
const checkMaxLength = (string, maxLength) => string.length <= maxLength;

//Проверяет строку на палиндром
const checkPalindrome = (string) => {
  const normalizeString = String(string).toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  let index = normalizeString.length - 1;
  while (index >= 0) {
    reverseString += String(normalizeString.at(index));
    index--;
  }
  return (reverseString === normalizeString) ? 'Это палиндром!' : 'Это не палиндром!';
};
