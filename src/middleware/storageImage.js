import multer from "multer";

export const bannerProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/bannerProduct')
  },
  filename: function (req, file, cb) {
    const typeFile = file.mimetype.split("/");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});


export const bannerNotify = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/bannerNotify')
  },
  filename: function (req, file, cb) {
    const typeFile = file.mimetype.split("/");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});


export const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar')
  },
  filename: function (req, file, cb) {
    const typeFile = file.mimetype.split("/");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});