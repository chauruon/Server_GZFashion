import express  from "express";
import {
  RegisterUser,
  LoginUser,
  UpdateUser,
} from "../controllers/UserController/User.js";
import {
  NewProducts,
} from "../controllers/ProductController/Products.js";
import storage from "../middleware/storageImage.js";
import multer from "multer";

const router = express.Router();



var upload = multer({ storage: storage })

/**
 * User
 */
router.post(`/register`, RegisterUser);
router.post(`/login`, LoginUser);
router.put(`/update_user`,upload.single('avatar'), UpdateUser);




/**
 * Products
 */
router.post(`/new_product`,upload.array('banner',5),NewProducts);

export default router