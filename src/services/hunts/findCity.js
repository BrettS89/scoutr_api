const Hunt = require('../../models/Hunt');

exports.cleanSearchTerm = (searchTerm) => {
  return searchTerm.replace(/\W/, '').toLowerCase();
};

exports.queryCities = async (searchTerm) => {
  const cities = await Hunt.aggregate([
    { $match: { $text: { $search:  searchTerm } } },
    { $sort: { score: { $meta: "textScore" } } },
    { $project: { 
        // city: true,
        city2: true,
        stateAbv: true,
        zip: true,
        location: true,
      }, 
    },
  ]).limit(20).lean();

  if (!cities.length) return null;
  return cities;
};

exports.formatCityRespoonse = (cities) => {
  return cities.map(c => {
    return {
      ...c,
      fullAddress: `${c.city2}, ${c.stateAbv}, ${c.zip}`
    };
  });
};

exports.getUniqueLocations = (cities) => {
  const uniqueLocations = [];
  const cityTable = {};
  cities.forEach(c => {
    if (!cityTable[c.fullAddress]) {
      uniqueLocations.push(c.fullAddress);
      cityTable[c.fullAddress] = true;
    }
  });
  return uniqueLocations;
};
