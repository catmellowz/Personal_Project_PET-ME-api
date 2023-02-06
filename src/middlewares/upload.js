const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file) cb(new Error());
    cb(null, 'public/images');
    //path keep file
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        '' +
        Math.round(Math.random() * 1000000000) +
        '.' +
        file.mimetype.split('/')[1]
    );
    //random number file uploaded
  },
});

module.exports = multer({ storage });
