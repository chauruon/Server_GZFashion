import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import moment from "moment";
import router from "./src/routes/router.js";
import path from 'path';
import fs from "fs-extra"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use(express.static(path.join("public")));

const crt = fs.existsSync(path.join(__dirname,'server.crt'));
const key = fs.existsSync(path.join(__dirname,'server.key'));
const crtString = path.join(__dirname,'server.crt');
const keyString = path.join(__dirname,'server.key');

if (!crt) {
  fs.ensureFile(crtString, err => {
    console.log(err) // => null
    // file has now been created, including the directory it is to be placed in
  });  
}
if (!key) {
  fs.ensureFile(keyString, err => {
    console.log(err) // => null
    // file has now been created, including the directory it is to be placed in
  });
}

const dir_categories = './public/categories_icon';
const dir_avatar = './public/avatar';
const dir_banner_notify = './public/banner_notify';
const dir_banner_product = 'public/banner_product';
const dir_cv_file = 'public/download';

if (!fs.existsSync(dir_cv_file)){
  fs.mkdirSync(dir_cv_file,{ recursive: true });
}
if (!fs.existsSync(dir_banner_product)){
  fs.mkdirSync(dir_banner_product,{ recursive: true });
}
if (!fs.existsSync(dir_categories)){
  fs.mkdirSync(dir_categories, { recursive: true });
};
if (!fs.existsSync(dir_avatar)){
  fs.mkdirSync(dir_avatar, { recursive: true });
};
if (!fs.existsSync(dir_banner_notify)){
  fs.mkdirSync(dir_banner_notify, { recursive: true });
};



app.use(`${process.env.API}`,router);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.GZFASHION_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  console.log(`Server đang chạy port: ${process.env.PORT}`)
).catch((error)=> 
  console.log(`Server lỗi: `,error.message)
);

app.listen(process.env.PORT);
