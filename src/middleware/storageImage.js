import multer from "multer";
import moment from "moment";
const currentDate = moment().unix();

export const bannerProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/banner_product')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});


export const bannerNotify = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/banner_notify')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});

export const menuMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/menus')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    const filename = file.originalname.split(".");
    // cb(null, file.fieldname + '-' + filename[0] + '-' + currentDate + ext)
    cb(null,`${file.fieldname}-${filename[0]}-${currentDate}${ext}`)
  }
});


export const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' +  + ext)
  }
});