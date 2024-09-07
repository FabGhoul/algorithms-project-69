/*const checkDocShoot = (docToken, shootToken) => {
  const doc = docToken.match(/\w+/g);
  const shoot = shootToken.match(/\w+/g)[0];

  if (doc.includes(shoot)) {
    return true;
  }

  return false;
};*/

const countDocShoot = (docToken, shootToken) => {
  const doc = docToken.match(/\w+/g);
  const shoot = shootToken.match(/\w+/g)[0];

  let count = 0;

  for (const word of doc) {
    if (word === shoot) {
      count +=1;
    }
  }

  return count;
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
    const shootCount = countDocShoot(doc.text, shoot);
    if (shootCount > 0) {
      result.push({ id: doc.id, count: shootCount });
      // А можно на каждой итерации, определять, куда будем ставить 
    }
  }

  result.sort((a, b) => b.count - a.count);

  return result.map((item) => item.id);
};

export default search;