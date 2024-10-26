/**
 * @param {Object} index
 * @param {String} shootToken
 */
const searchByIndex = (index, shootToken, docsCount) => {
  const shootArr = shootToken.match(/\w+/g).map((item) => item.toLowerCase());

  const docsMethric = {};
  shootArr.forEach((word) => {
    if (index[word]) {
      const wordDocIds = Object.keys(index[word]);

      const termCount = wordDocIds.length;
      const wordIdf = Math.log2(1 + (docsCount - termCount + 1) / (termCount + 0.5));

      wordDocIds.forEach((docId) => {
        if (index[word][docId]) {
          const wordData = index[word][docId];
          if (!(docId in docsMethric)) {
            docsMethric[docId] = { tfIdf: 0 };
          }

          const wordTf = wordData.count / wordData.totalCount;

          docsMethric[docId].tfIdf += wordTf * wordIdf;
        }
      });
    }
  });

  return Object.keys(docsMethric).map((id) => ({ id, ...docsMethric[id] }));
};

/**
 * @param {Array} docs
 */
export const indexReverse = (docs) => {
  const index = {};
  docs.forEach((doc) => {
    const docArr = doc.text.match(/\w+/g).map((item) => item.toLowerCase());
    docArr.forEach((item) => {
      if (!(item in index)) {
        index[item] = {};
      }

      if (!(doc.id in index[item])) {
        index[item][doc.id] = { count: 0, totalCount: docArr.length };
      }

      index[item][doc.id].count += 1;
    });
  });

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
  const result = searchByIndex(index, shoot, docs.length);

  result.sort((a, b) => (a.tfIdf < b.tfIdf ? 1 : -1));

  return result.map((item) => item.id);
};

export default search;
