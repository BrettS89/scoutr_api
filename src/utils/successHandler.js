module.exports = (res, status, data, token) => {
  if (data && token)
    return res.status(status).json({ data, token });

  if (data && !token)
    return res.status(status).json({ data });
};
