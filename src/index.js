/**
 * @param {Object} index
 * @param {String} shootToken
 */
const searchByIndex = (index, shootToken) => {
  const shootArr = shootToken.match(/\w+/g).map((item) => item.toLowerCase());

  const docsMethric = {};
  for (const word of shootArr) {
    for (const docId in index[word]) {
      if (!docsMethric.hasOwnProperty(docId)) {
        docsMethric[docId] = { wordsCount: 0, totalCount: 0 };
      }

      docsMethric[docId].wordsCount += 1;
      docsMethric[docId].totalCount += index[word][docId].count;
    }
  }

  return Object.keys(docsMethric).map((id) => ({ id, ...docsMethric[id] }));
};

/**
 * @param {Array} docs
 */
export const indexReverse = (docs) => {
  const index = {};
  for (const doc of docs) {
    const docArr = doc.text.match(/\w+/g).map((item) => item.toLowerCase());
    for (const item of docArr) {
      if (!index.hasOwnProperty(item)) {
        index[item] = {};
      }

      if (!index[item].hasOwnProperty(doc.id)) {
        index[item][doc.id] = { count: 0 };
      }

      index[item][doc.id].count += 1;
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

  const index = indexReverse(docs);
  const result = searchByIndex(index, shoot);

  result.sort((a, b) => {
    if (a.wordsCount === b.wordsCount) {
      return a.totalCount < b.totalCount ? 1 : -1;
    }

    return a.wordsCount < b.wordsCount ? 1 : -1;
  });

  return result.map((item) => item.id);
};

export default search;
