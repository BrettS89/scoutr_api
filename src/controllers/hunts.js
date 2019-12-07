const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const userAuth = require('../utils/userAuth');
const findCityService = require('../services/hunts/findCity');
const findHuntsService = require('../services/hunts/findHunts');
const getMyHuntsService = require('../services/hunts/getMyHunts');

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
    const user = await userAuth(req.header('authorization'));
    const { lat, lon } = findHuntsService.formatLatLon(req.query);
    const hunts = await findHuntsService.fancyGeoSearch(user._id, lat, lon);
    console.log(hunts);
    successHandler(res, 200, hunts, null);
  } catch(e) {
    errorHandler(res, e, 'findHunts');
  }
};

exports.getMyHunts = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const myHunts = await getMyHuntsService.myHuntsQuery(user._id, req.query.offset);
    successHandler(res, 200, myHunts, null);
  } catch(e) {
    errorHandler(res, e, 'getMyHunts');
  }
};
