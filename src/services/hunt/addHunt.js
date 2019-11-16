const Hunt = require('../../models/Hunt');

exports.createHuntModel = ({ 
  prize, prizePic, lat, lon, tokens, description, createdBy, prizeCost, city, city2, state, stateAbv, zip,
}) => {
  city2 = city2 ? city2 : city;
  console.log(city2);
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
    city2,
    state,
    stateAbv,
    zip,
    fullAddress: `${city} ${city2} ${stateAbv} ${zip}`,
  });
};
