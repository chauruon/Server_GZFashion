import express from "express";
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


const storage_image = multer.diskStorage({
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

const upload_image = multer({
  storage: storage_image,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).fields(
  [
    {
      name: 'profile',
      maxCount: 1
    },
    {
      name: 'natid', maxCount: 1
    },
    {
      name: 'certificate', maxCount: 1
    }
  ]
);

function checkFileType(file, cb) {
  if (file.fieldname === "certificate") {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) { // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
  else if (file.fieldname === "natid" || file.fieldname === "profile") {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      fiel.mimetype === 'image/gif'
    ) { // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
}



/**
 * User
 */
router.post(`/register`, RegisterUser);
router.post(`/login`, LoginUser);
router.patch(`/update_user`, avatar.single('avatar'), UpdateUser);
router.delete(`/delete_users`, DeleteUsers);
router.get(`/list_users`, GetUsers);

/**
 * Products
 */

router.post(`/new_product`, banner_product.fields([{
  name: 'banner', maxCount: 6
}, {
  name: 'icon', maxCount: 1
}]), NewProducts);
router.get(`/product_detail`, GetDetadilProducsts);
router.get(`/list_products`, GetAllProducsts);
router.delete(`/delete_products`, DeleteProducts);

// Shopping_carts
router.get(`/list_shopping_carts`, GetShoppingCart);
router.post(`/shopping_cart`, ShoppingCart);
router.delete(`/delete_shopping_carts`, DeleteShoppingCart);


// Banner
router.post(`/up_banner_notify`, banner_notify.single('banner'), UploadBannerNotify);
router.get(`/banner_notify`, GetBannerNotify);
router.delete(`/delete_banners`, DeleteBanners);

// Categories
router.post("/update_categories", categories_image.single('icon'), UpdateAndNewCategories);
router.get("/list_categories", GetCategories);
router.delete(`/delete_categories`, DeleteCategories);


export default router