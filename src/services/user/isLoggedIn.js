exports.updateUser = (user) => {
  user.lastLogin = new Date();
  user.logins += 1;
  return user;
};

exports.formatResponse = (user, myHunts) => {
  return {
    user,
    myHunts,
  };
};
