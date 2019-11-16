const Hunt = require('../models/Hunt');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const userAuth = require('../utils/userAuth');
const findCityService = require('../services/hunts/findCity');

exports.findCity = async (req, res) => {
  try {

    // await userAuth(req.header('authorization'));
    const searchTerm = findCityService.cleanSearchTerm(req.query.city);
    const cities = await findCityService.queryCities(searchTerm);
    if (!cities) return successHandler(res, 200, [], null);
    const formattedCities = findCityService.formatCityRespoonse(cities);
    console.log(formattedCities);
    const uniqueLocations = findCityService.getUniqueLocations(formattedCities);
    successHandler(res, 200, uniqueLocations, null);
  } catch(e) {
    errorHandler(res, e, 'findCity');
  }
};
