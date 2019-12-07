const Hunt = require('../../models/Hunt');

exports.formatLatLon = (coords) => {
  const { lat, lon } = coords;
  return {
    lat: Number(lat),
    lon: Number(lon),
  };
};

exports.geoSearch = async (lat, lon) => {
  return Hunt.find({
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

exports.fancyGeoSearch = async (userId, lat, lon) => {
  return Hunt.aggregate([
    { $geoNear: {
      near: { type: "Point", coordinates: [ lon , lat ] },
      distanceField: "dist.location",
      maxDistance: 300,
    },
  },
  {
    '$lookup': {
      'from': 'enteredhunts',
      'let': { 'id': "$_id" },
      'pipeline': [
        { '$match':
           { '$expr':
              { '$and':
                 [
                   { '$eq': [ "$huntId",  "$$id" ] },
                   { '$eq': [ "$userId", userId ] }
                 ]
              }
           }
        },
     ],
      'as': "enteredArray",
    },
  },
  {
    '$match': { 'enteredArray': { '$eq': [] } }
  },
  ]);
};
