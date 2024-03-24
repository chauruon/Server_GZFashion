import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { TypeCategories } from "../../utils/Common.js";
import { triggerAsyncId } from "async_hooks";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";
import { GetCategories } from "../CategoriesController/Categories.js";
import {
  UploadBannerNotify,
  createCateByProduct
} from "../BannerNotify/Notify.js"
import {
  verifyRefreshToken,
} from "../../middleware/generate_token.js"



export const currentDate = moment().unix();


/**
 * Tạo mới sản phẩm
 * @param {id}
*/
export const NewProducts = async (req, res) => {
  try { 
    const bannerFiles = req.files['banner'];
    const thumbnailFile = bannerFiles[0];
    const bannerUrls = bannerFiles.map((file) => {
      return "/banner_product/" + file.filename;
    });
    const iconFile = req.files['icon'][0];
    const iconUrl = "/categories_icon/" + iconFile.filename;
    const checkType = CategoriesModel.findOne({type: req.body.typeCate});
    console.log('checkType: ', checkType);
    if (checkType !== null) {
      const newCategories = await CategoriesModel({ 
        type: req.body.typeCate ? req.body.typeCate : "",
        title: req.body.titleCate ? req.body.titleCate : "",
        icon: iconUrl ? iconUrl : "",
        create_at: currentDate,
      });
      await newCategories.save();
    }
    
    const newProducts = await ProductModel({
      banner: bannerUrls,
      thumbnail: "/banner_product/" + thumbnailFile.filename,
      title: req.body.title,
      decs: req.body.decs,
      price: req.body.price,
      sale_off: req.body.sale_off,
      categories: newCategories._id,
    });
    await newProducts.save();
    
    res.status(200).json({
      status: true,
      product: newProducts,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: "Vui lòng liên hệ admin",
    });
  }
};

export const GetDetadilProducsts = async (req,res) => {
  const { id } = req.body;
  try {
    const detail = await ProductModel.findById(id).populate("categories");

    if (!res.status(200)) {
      console.log(`Get Detadil Producsts error`);
    } else res.status(200).json({
      status: true,
      detail: detail,
    });

  } catch (e) {
    console.log('e: ', e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}

export const GetAllProducsts = async (req,res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed

    const skip = (page - 1) * pageSize;

    const totalProducts = await ProductModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / pageSize);
    
    const products = await ProductModel.find({}).populate("categories").skip(skip).limit(pageSize);
    const token = req.headers.authorization.split(" ")[1]
    console.log('req.headers.authorization: ', );
    // console.log('req.header: ', req);

    const verify = verifyRefreshToken(token);
    console.log('verify: ', verify);



    if (!res.status(200)) {
      res.status(400).json({
        status: false,
        message: "Vui lòng liêm hệ admin",
      });
    } else res.status(200).json({
      status: true,
      page,
      pageSize,
      totalPages,
      totalProducts,
      products:products,
    });
  } catch (e) {
    res.status(409).json({
      status: false,
      message: e.message
    });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}


export const DeleteProducts = async (req,res) => {
  try {
    await ProductModel.deleteMany();
    
    if (!res.status(200)) {
      console.log(`delete products error`);
    } else res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công!",
    });
  } catch (e) {
    console.log('e: ', e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}
