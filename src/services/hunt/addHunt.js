const Hunt = require('../../models/Hunt');

exports.createHuntModel = ({ 
  prize, prizePic, lat, lon, tokens, description, createdBy, prizeCost, city, city2, state, stateAbv, zip,
}) => {
  return new Hunt({
    prize,
    prizeCost,
    prizePic,
    location: {
      type: 'Point',
      coordinates: [lon, lat],
    },
    tokens,
    description,
    createdBy,
    city,
    city2: city2 ? city2 : city,
    state,
    stateAbv,
    zip,
    fullAddress: `${city}, ${stateAbv}, ${zip}`,
  });
};
