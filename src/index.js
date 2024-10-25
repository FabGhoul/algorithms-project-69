const countDocWord = (docArr, word) => {
  let count = 0;

  for (const item of docArr) {
    if (item === word) {
      count +=1;
    }
  }

  return count;
};

/**
 * Возвращает количество найденных слов и сумму их вхождений
 * @param docToken Необработанная строка документа
 * @param shootToken Необработанная поисковая строка
 * @returns {{wordsCount: number, totalCount: number}}
 */
const searchDocShoot = (docToken, shootToken) => {
  const docArr = docToken.match(/\w+/g).map((item) => item.toLowerCase());
  const shootArr = shootToken.match(/\w+/g).map((item) => item.toLowerCase());

  let wordsCount = 0;
  let totalCount = 0;

  for (const word of shootArr) {
    if (docArr.includes(word)) {
      wordsCount += 1;
      totalCount += countDocWord(docArr, word);
    }
  }

  return { wordsCount, totalCount };
};

export const indexReverse = (docs) => {
  const index = {};
  for (const doc of docs) {
    const docArr = doc.text.match(/\w+/g).map((item) => item.toLowerCase());
    for (const item of docArr) {
      if (!index.hasOwnProperty(item)) {
        index[item] = [];
      }

      if (!index[item].includes(doc.id)) {
        index[item].push(doc.id);
      }
    }
  }

  return index;
};

/**
 * @param {Array} docs
 * @param {String} shoot
 */
const search = (docs, shoot) => {
  if (!docs || !Array.isArray(docs) || !docs.length) {
    return [];
  }

  if (!shoot || !shoot.length) {
    return [];
  }

  const result = []

  for (const doc of docs) {
    const { wordsCount, totalCount } = searchDocShoot(doc.text, shoot);
    if (wordsCount > 0) {
      result.push({ id: doc.id, wordsCount, totalCount });
    }
  }

  result.sort((a, b) => {
    if (a.wordsCount === b.wordsCount) {
      return a.totalCount < b.totalCount ? 1 : -1;
    }

    return a.wordsCount < b.wordsCount ? 1 : -1;
  });

  return result.map((item) => item.id);
};

export default search;
