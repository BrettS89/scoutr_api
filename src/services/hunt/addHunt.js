const Hunt = require('../../models/Hunt');

exports.createHuntModel = ({ 
  prize, prizePic, lat, lon, tokens, description, createdBy,
}) => {
  return new Hunt({
    prize,
    prizePic,
    coords: {
      lat,
      lon,
    },
    tokens,
    description,
    createdBy,
  });
};
