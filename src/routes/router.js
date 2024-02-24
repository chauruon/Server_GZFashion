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
  categoriesImage,
} from "../middleware/storageImage.js";
import {
  GetBannerNotify,
  UploadBannerNotify,
  DeleteBanners,
} from "../controllers/BannerNotify/Notify.js";
import {
  GetCategories,
  UpdateAndNewCategories,
  DeleteCategories,
} from "../controllers/CategoriesController/Categories.js";

const router = express.Router();

const avatar = multer({ storage: avatarStorage });
const banner_notify = multer({ storage: bannerNotify });
const banner_product = multer({ storage: bannerProduct });
const categories_image = multer({ storage: categoriesImage });

/**
 * User
 */
router.post(`/register`, RegisterUser);
router.post(`/login`, LoginUser);
router.patch(`/update_user`,avatar.single('avatar'), UpdateUser);
router.delete(`/delete_users`,DeleteUsers);
router.get(`/list_users`,GetUsers);

/**
 * Products
 */
router.post(`/new_product`,banner_product.array('banner',6),NewProducts);
router.get(`/product_detail`,GetDetadilProducsts);
router.get(`/list_products`,GetAllProducsts);
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
router.post("/update_categories",categories_image.single('icon'), UpdateAndNewCategories);
router.get("/list_categories", GetCategories);
router.delete(`/delete_categories`,DeleteCategories);


export default router