import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs"
import { TypeCategories } from "../../utils/Common.js";

/**
  * Tạo mới sản phẩm
	* @param {id}
	*/
export const NewProducts = async (req, res) => {
  try {
    const fullUrl = req.files.map((ele,idx) => {
      const url = "/images/" + ele.filename;
      return "/images/" + ele.filename;
    })
    
    const newProducts = await ProductModel({
      banner: fullUrl,
      thumbnail: fullUrl[0],
      title: req.body.title,
      decs: req.body.decs,
      typeCategories: req.body.typeCategories,
    });

    const newSave = await newProducts.save();
    console.log('newSave: ', newSave);
    if (!res.status(201)) {
      console.log(`Save New Products error`);
    }else
      res.status(201).json(newSave);
  } catch (e) {
    console.log('e: ', e);
    res.status(409).json({message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}