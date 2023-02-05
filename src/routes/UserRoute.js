import express  from "express";
import {
  RegisterUser,
  LoginUser,
  UpdateUser,
} from "../controllers/UserController/User.js";
import {
  GetDetadilProducsts,
  NewProducts,
} from "../controllers/ProductController/Products.js";
import {
  avatarStorage,
  bannerNotify,
  bannerProduct,
} from "../middleware/storageImage.js";
import multer from "multer";
import { UploadBannerNotify } from "../controllers/BannerADS/ADS.js";

const router = express.Router();



const avatar = multer({ storage: avatarStorage });
const banner_notify = multer({ storage: bannerNotify });
const banner_product = multer({ storage: bannerProduct });

/**
 * User
 */
router.post(`/register`, RegisterUser);
router.post(`/login`, LoginUser);
router.put(`/update_user`,avatar.single('avatar'), UpdateUser);




/**
 * Products
 */
router.post(`/new_product`,banner_product.array('banner',5),NewProducts);
router.get(`/product_detail`,GetDetadilProducsts);


router.post(`/banner_notify`,banner_notify.single('image'),UploadBannerNotify)
export default router