import multer from "multer";
import fs from "fs"

// var fs = require('fs');



export const bannerProduct = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'public/banner_product')
  },
  filename: function (req, file, cb) {
    var dir = 'public/banner_product';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const typeFile = file.mimetype.split("/");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});


export const bannerNotify = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/banner_notify')
  },
  filename: function (req, file, cb) {
    var dir = './public/banner_notify/';

    // if (!fs.existsSync(dir)){
    //     fs.mkdirSync(dir, { recursive: true });
    // }
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
    var dir = './public/avatar';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    const typeFile = file.mimetype.split("/");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});