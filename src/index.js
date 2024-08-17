const checkDocShoot = (docToken, shootToken) => {
  const doc = docToken.match(/\w+/g);
  const shoot = shootToken.match(/\w+/g);

  if (doc.indexOf(' ' + shoot + ' ') > -1 || doc.indexOf(shoot + ' ') === 0 || doc.indexOf(' ' + shoot) === doc.length - shoot.length - 1) {
    return true;
  }

  return false;
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
    if (checkDocShoot(doc, shoot)) {
      result.push(doc.id);
    }
  }

  return result;
};

export default search;