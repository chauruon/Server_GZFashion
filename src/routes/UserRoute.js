import express  from "express";
import {
  RegisterUser,
  LoginUser,
  UpdateUser,
} from "../controllers/UserController/User.js";
import {
  GetAllProducsts,
  GetDetadilProducsts,
  NewProducts,
} from "../controllers/ProductController/Products.js";
import {
  avatarStorage,
  bannerNotify,
  bannerProduct,
} from "../middleware/storageImage.js";
import multer from "multer";
import { GetBannerNotify, UploadBannerNotify } from "../controllers/BannerNotify/Notify.js";
import { GetCategories, NewCategories, UpNewCategories } from "../controllers/CategoriesController/Categories.js";

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
router.get(`/products`,GetAllProducsts)
// Banner
router.post(`/up_banner_notify`,banner_notify.single('banner'),UploadBannerNotify)
router.get(`/banner_notify`,GetBannerNotify)

// Categories
router.post("/new_update_categories", UpNewCategories);
router.post("/new_categories", NewCategories);
router.get("/categories", GetCategories)

export default router