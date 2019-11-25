exports.updateUser = (user) => {
  user.lastLogin = new Date();
  user.logins += 1;
  return updateUser;
};

exports.formatResponse = (user, myHunts) => {
  return {
    user,
    myHunts,
  };
};
