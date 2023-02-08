const cloudinary = require('../utils/cloudinary');

exports.uploadSlipImage = async (req, res, next) => {
  try {
    const result = await cloudinary.upload(req.file.path);
    console.log(result);
    res.status(200).json();
  } catch (err) {
    // console.log('uploadSlip', err);
    next(err);
  }
};
