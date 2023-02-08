const cloudinary = require('../utils/cloudinary');

exports.uploadSlipImage = async (req, res, next) => {
  try {
    console.log(req.file);

    await cloudinary.upload(req.file.path);
    res.status(200).json();
  } catch (err) {
    // console.log('uploadSlip', err);
    next(err);
  }
};
