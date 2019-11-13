const Hunt = require('../models/Hunt');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const addHuntService = require('../services/hunt/addHunt');
const adminAuth = require('../utils/adminAuth');

exports.addHunt = async (req, res) => {
  try {
    const authToken = req.header('authorization');
    const user = await adminAuth.adminAuth(authToken);
    req.body.createdBy = user._id;
    const hunt = await addHuntService.createHuntModel(req.body).save();
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
