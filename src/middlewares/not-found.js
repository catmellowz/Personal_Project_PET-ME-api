module.exports = (req, res, next) => {
  // throw new Error('TEST ERROR');
  res
    .status(404)
    .json({ message: 'resource not found on this server' });
};
