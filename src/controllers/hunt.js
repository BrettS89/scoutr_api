const Hunt = require('../models/Hunt');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const addHuntService = require('../services/hunt/addHunt');

exports.addHunt = async (req, res) => {
  try {
    // admin auth
    const hunt = await addHuntService.createHuntModel(req.body);
    successHandler(res, 201, hunt, null);
  } catch(e) {
    errorHandler(res, e, 'addHunt');
  }
};

exports.playHunt = async (req, res) => {
  try {

  } catch(e) {
    errorHandler(res, e, 'playHunt');
  }
};

exports.wonHunt = async (req, res) => {
  try {

  } catch(e) {
    errorHandler(res, e, 'wonHunt');
  }
};
