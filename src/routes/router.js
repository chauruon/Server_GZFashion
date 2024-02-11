import express  from "express";
import multer from "multer";
import {
  RegisterUser,
  LoginUser,
  UpdateUser,
  DeleteUsers,
  GetUsers,
} from "../controllers/UserController/User.js";
import {
  GetAllProducsts,
  GetDetadilProducsts,
  NewProducts,
  DeleteProducts,
} from "../controllers/ProductController/Products.js";
import {
  ShoppingCart,
  GetShoppingCart,
  DeleteShoppingCart,
} from "../controllers/ProductController/ShoppingCart.js"
import {
  avatarStorage,
  bannerNotify,
  bannerProduct,
} from "../middleware/storageImage.js";
import {
  GetBannerNotify,
  UploadBannerNotify,
  DeleteBanners,
} from "../controllers/BannerNotify/Notify.js";
import {
  GetCategories,
  NewCategories,
  UpNewCategories,
  DeleteCategories,
} from "../controllers/CategoriesController/Categories.js";

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
router.delete(`/delete_users`,DeleteUsers);
router.get(`/list_users`,GetUsers);

/**
 * Products
 */
router.post(`/new_product`,banner_product.array('banner',5),NewProducts);
router.get(`/product_detail`,GetDetadilProducsts);
router.get(`/products`,GetAllProducsts);
router.delete(`/delete_products`,DeleteProducts);

// Shopping_carts
router.get(`/list_shopping_carts`,GetShoppingCart);
router.post(`/shopping_cart`,ShoppingCart);
router.delete(`/delete_shopping_carts`,DeleteShoppingCart);


// Banner
router.post(`/up_banner_notify`,banner_notify.single('banner'),UploadBannerNotify);
router.get(`/banner_notify`,GetBannerNotify);
router.delete(`/delete_banners`,DeleteBanners);

// Categories
router.post("/new_update_categories", UpNewCategories);
router.post("/new_categories", NewCategories);
router.get("/categories", GetCategories);
router.delete(`/delete_categories`,DeleteCategories);


export default router