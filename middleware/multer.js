const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    console.log(req.body)
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
