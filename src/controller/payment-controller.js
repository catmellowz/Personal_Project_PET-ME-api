exports.uploadSlip = async (req, res, next) => {
  try {
    console.log(req.files);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};
