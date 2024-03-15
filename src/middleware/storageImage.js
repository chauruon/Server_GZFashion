import multer from "multer";
import fs from "fs-extra"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const bannerProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "banner") {
      cb(null, 'public/banner_product');
    } else {
      cb(null, 'public/categories_icon');
    }
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     if (file.fieldname === "profile") {
         cb(null, './uploads/profiles/')
     }
     else if (file.fieldname === "natid") {
         cb(null, './uploads/ids/');
     }
     else if (file.fieldname === "certificate") {
         cb(null, './uploads/certificates/')
     }
  },
  filename:(req,file,cb)=>{
      if (file.fieldname === "profile") {
          cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      }
    else if (file.fieldname === "natid") {
      cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
    else if (file.fieldname === "certificate") {
      cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  }
});

export const up_CV_Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/download')
  },
  filename: function (req, file, cb) {
    const nameFile = file.originalname.split('.')[0];
    const typeFile = file.originalname.split('.')[1];
    cb(null, `${file.fieldname.toUpperCase()}_${nameFile}-${Date.now()}.${typeFile}`)
  }
});

