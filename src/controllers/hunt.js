const Hunt = require('../models/Hunt');
const User = require('../models/User');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const addHuntService = require('../services/hunt/addHunt');
const adminAuth = require('../utils/adminAuth');
const userAuth = require('../utils/userAuth');
const createEnteredHuntService = require('../services/enteredHunt/createEnteredHunt');
const getMyHuntsService = require('../services/hunts/getMyHunts');


exports.addHunt = async (req, res) => {
  try {
    // const authToken = req.header('authorization');
    // const user = await adminAuth.adminAuth(authToken);
    // req.body.createdBy = user._id;
    req.body.createdBy = '5dd011395bc49803608f345a';
    const hunt = await addHuntService.createHuntModel(req.body).save();
    successHandler(res, 201, hunt, null);
  } catch(e) {
    errorHandler(res, e, 'addHunt');
  }
};

exports.enterHunt = async (req, res) => {
  try {
    let user = await userAuth(req.header('authorization'));
    user = await User.findById(user._id);
    const hunt = await Hunt.findById(req.body.huntId);
    if (hunt.winner) {
      throw {
        status: 400,
        error: new Error('Somebody already won this hunt'),
      };
    }
    if (hunt.tokens > user.tokens) {
      throw {
        status: 400,
        error: new Error('You don\'t have enough tokens to enter this hunt'),
      };
    }
    user.tokens -= hunt.tokens;
    user = await user.save();
    await createEnteredHuntService.createEnteredHunt(user._id, hunt._id).save();
    hunt.players += 1;
    await hunt.save();
    const myHunts = await getMyHuntsService.myHuntsQuery(user._id, 0);
    successHandler(res, 201, { myHunts, userData: user }, null);
  } catch(e) {
    errorHandler(res, e, 'enterHunt');
  }
};

exports.wonHunt = async (req, res) => {
  try {
    let user = await userAuth(req.header('authorization'));
    const hunt = await Hunt.findById(req.body.hunt);
    if (hunt.finished) {
      throw {
        status: 400,
        error: new Error('This hunt has already been finished'),
      };
    }
    hunt.winner = user._id;
    hunt.finished = true;
    // trigger notification
    // create new document type?
    await hunt.save();
    successHandler(res, 200, null, null);
  } catch(e) {
    errorHandler(res, e, 'wonHunt');
  }
};
