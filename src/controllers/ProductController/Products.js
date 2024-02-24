import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { TypeCategories } from "../../utils/Common.js";
import { triggerAsyncId } from "async_hooks";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";


export const currentDate = moment().unix();


/**
 * Tạo mới sản phẩm
 * @param {id}
 */

export const NewProducts = async (req, res) => {
  try {
    const fullUrl = req.files.map((ele, idx) => {
      return "/banner_product/" + ele.filename;
    });
		const newCategories = await CategoriesModel({ 
      type: req.body.type,
      title: req.body.titleCate,
      create_at: currentDate,
    });
    await newCategories.save();
    
    const newProducts = await ProductModel({
      banner: fullUrl,
      thumbnail: fullUrl[0],
      title: req.body.title,
      decs: req.body.decs,
      price: req.body.price,
      sale_off: req.body.sale_off,
      categories: newCategories._id,
    });
    await newProducts.save();
    
    if (!res.status(201)) {
      console.log(`Save New Products error`);
    } else res.status(201).json({
      status: true,
      product: newProducts,
    });
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
};

export const GetDetadilProducsts = async (req,res) => {
  const { id } = req.body;
  try {
    const detail = await ProductModel.findById(id).populate("categories");

    if (!res.status(201)) {
      console.log(`Get Detadil Producsts error`);
    } else res.status(201).json(detail);

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
    // const products = await ProductModel.find({}).populate("categories").skip(1).limit(10);;
    if (!res.status(200)) {
      console.log(`Get Producsts error`);
    } else res.status(200).json({
      status: true,
      page,
      pageSize,
      totalPages,
      totalProducts,
      products:products,
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
