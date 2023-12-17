import express  from "express";
import {
  RegisterUser,
  LoginUser,
  UpdateUser,
  ListUser,
  RemoveUsers,
  SoftDeleteUser,
} from "../controllers/UserController/User.js";
import {
  GetDetadilProducsts,
  NewProducts,
  AllProduct,
  RemoveProduct,
  SoftDeleteByIDProduct,
} from "../controllers/ProductController/Products.js";
import {
  UploadMenus,
  RemoveMenus,
  ListMenus
} from "../controllers/MenuController/Menu.js";
import {
  avatarStorage,
  bannerNotify,
  bannerProduct,
  menuMulter
} from "../middleware/storageImage.js";
import {
  GetBannerNotify,
  UploadBannerNotify,
} from "../controllers/BannerNotify/Notify.js";
import multer from "multer";

const router = express.Router();



const avatar = multer({ storage: avatarStorage });
const banner_notify = multer({ storage: bannerNotify });
const banner_product = multer({ storage: bannerProduct });
const menu_multer = multer({ storage: menuMulter });


/**
 * User
 */
router.post(`/register`, RegisterUser);
router.post(`/login`, LoginUser);
router.patch(`/update_user`,avatar.single('avatar'), UpdateUser);
router.get('/list_users',ListUser);
router.delete('/delete_users',RemoveUsers);
router.patch('/soft_delete_user/:id',SoftDeleteUser);



/**
 * Products
 */
router.post(`/new_product`,banner_product.array('banner',5),NewProducts);
router.get(`/product_detail/:id`,GetDetadilProducsts);
router.get('/products',AllProduct);
router.delete('/delete_product',RemoveProduct);
router.patch('/soft_detele_product/:id',SoftDeleteByIDProduct);

// banner
router.post(`/up_banner_notify`,banner_notify.single('banner'),UploadBannerNotify);
router.get(`/banner_notify`,GetBannerNotify);

// Menu
router.post(`/up_menu`,menu_multer.single('icon'),UploadMenus);
router.get('/menus',ListMenus)
router.delete(`/delete_menu`,RemoveMenus);

export default router