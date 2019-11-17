const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const userAuth = require('../utils/userAuth');
const findCityService = require('../services/hunts/findCity');
const findHuntsService = require('../services/hunts/findHunts');

exports.findCity = async (req, res) => {
  try {
    await userAuth(req.header('authorization'));
    const searchTerm = findCityService.cleanSearchTerm(req.query.city);
    const cities = await findCityService.queryCities(searchTerm);
    if (!cities) return successHandler(res, 200, [], null);
    const formattedCities = findCityService.formatCityRespoonse(cities);
    const uniqueLocations = findCityService.getUniqueLocations(formattedCities);
    successHandler(res, 200, uniqueLocations, null);
  } catch(e) {
    errorHandler(res, e, 'findCity');
  }
};

exports.findHunts = async (req, res) => {
  try {
    await userAuth(req.header('authorization'));
    const { lat, lon } = findHuntsService.formatLatLon(req.query);
    const hunts = await findHuntsService.geoSearch(lat, lon);
    successHandler(res, 200, hunts, null);
  } catch(e) {
    errorHandler(res, e, 'findHunts');
  }
};
