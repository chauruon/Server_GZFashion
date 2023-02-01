import ProductModel from "../../models/ProductModels/ProductModels";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs"

export const NewProducts = async (req, res) => {
  try {
    const newProducts = await ProductModel(req.body);
  } catch (e) {
    console.log('e: ', e);
    res.status(409).json({message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}