//
// Реализовать поиск в текстовом файле по ключевому слову.
// Принимает путь и опции работы(шаблон текста для поиска,кол-во строк до и после найденного фрагмента)
//
// Пример ввода для одной строки: node main.ts test.txt "Lorem ipsum" 1 1

const fs = require("fs");
// Поиск индексов совпадений
function searchInex(text, key, singleStr) {
  let buffer = [];

  for (let i = 0; i < text.length; i++) {

    if (text[i].search(key) != -1 && singleStr === false) {
      buffer.push(i);
      break
    }
    else if (text[i].search(key) != -1) {
      buffer.push(i);
    }
  }

  return buffer;
};
// Вывод строк по индексам с учетом фрагментов
function searchString(text, indexs, past, next) {
  let result = [];

  for (let value of indexs) {
    if (value - past < 0) var pastStr = text.slice(0, value);
    else var pastStr = text.slice(value - past, value);

    let valueStr = text.slice(value, value + 1);
    let nextStr = text.slice(value + 1, value + next + 1);
    let buff = pastStr + valueStr + nextStr;

    result.push(buff);
  }
  return result;
};

// Ассинхронное чтение и обработка
function dynamicRead(path) {
  fs.readFile(path, "utf8", function (error, data) {
    if (error) throw error;

    let text = data.toString().split("\n");
    let key = process.argv[3];
    let past = Number(process.argv[4]);
    let next = Number(process.argv[5]);
    let singleStr = Boolean(process.argv[6]);
    let indexs = searchInex(text, key, singleStr);
    
    if (Number.isNaN(past)) {
      past = 0;
    };
    if (Number.isNaN(next)) {
      next = 0;
    };

    // console.log(singleStr)
    console.log(searchString(text, indexs, past, next));
  });
}

dynamicRead(process.argv[2]);
console.log("tert");
