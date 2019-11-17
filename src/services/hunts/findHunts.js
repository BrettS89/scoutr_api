const Hunt = require('../../models/Hunt');

exports.formatLatLon = (coords) => {
  const { lat, lon } = coords;
  return {
    lat: Number(lat),
    lon: Number(lon),
  };
};

exports.geoSearch = async (lat, lon) => {
  return await Hunt.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [
            lon, lat,
          ],
        },
        $maxDistance: 300,
      }
    },
  });
};
