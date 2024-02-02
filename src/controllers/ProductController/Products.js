import ProductModel from "../../models/ProductModels/ProductModels.js";
import ShoppingCartModel from "../../models/ProductModels/ShoppingCart.js"
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { TypeCategories } from "../../utils/Common.js";
import { triggerAsyncId } from "async_hooks";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";


export const CurrentDate = moment().unix();


/**
 * Tạo mới sản phẩm
 * @param {id}
 */

export const NewProducts = async (req, res) => {
  try {
    const fullUrl = req.files.map((ele, idx) => {
      const url = "/images/" + ele.filename;
      return "/banner_product/" + ele.filename;
    });
		const newCategories = await CategoriesModel({ 
      type: req.body.type,
      title: req.body.titleCate,
      createAt: CurrentDate,
    });
    await newCategories.save();
    
    const newProducts = await ProductModel({
      banner: fullUrl,
      thumbnail: fullUrl[0],
      title: req.body.title,
      decs: req.body.decs,
      categories: newCategories._id,
    });
    await newProducts.save();
    
    if (!res.status(201)) {
      console.log(`Save New Products error`);
    } else res.status(201).json(newProducts);
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
    const all = await ProductModel.find({}).populate("categories")
    if (!res.status(201)) {
      console.log(`Get Producsts error`);
    } else res.status(201).json(all);

  } catch (e) {
    console.log('e: ', e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}

export const ShoppingCart = async (req,res) => {
  const { id } = req.body;
  if (id) {
    const cart = await ProductModel.findById(id).populate("categories");
    console.log('cart: ', cart);
    const _id = cart._id;
    const ojb = {
      creat_at: cart.create_at,
      thumbnail:cart.thumbnail,
      title:cart.title,
      decs:cart.decs,
      is_deleted:cart.is_deleted,
    }
    const newProducts = await ShoppingCartModel({_id: _id, shopping_cart: ojb });
    newProducts.save();

    if (!res.status(200)) {
      console.log(`Lưu sản phẩm không thành công`);
    } else res.status(200).json(newProducts);
  }
}