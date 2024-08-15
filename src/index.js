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

  const searchString = ' ' + shoot + ' '

  const result = []

  for (const doc of docs) {
    if (doc.text.indexOf(searchString) > -1) {
      result.push(doc.id);
    }
  }

  return result;
};

export default search;