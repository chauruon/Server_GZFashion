import multer from "multer";
import fs from "fs-extra"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const bannerProduct = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'public/banner_product')
  },
  filename: function (req, file, cb) {
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

export const categoriesImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/categories_icon')
  },
  filename: function (req, file, cb) {
    const typeFile = file.mimetype.split("/");
    const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});
