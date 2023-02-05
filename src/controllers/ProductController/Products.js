import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { TypeCategories } from "../../utils/Common.js";
import { triggerAsyncId } from "async_hooks";

/**
 * Tạo mới sản phẩm
 * @param {id}
 */

export const NewProducts = async (req, res) => {
  try {
    const fullUrl = req.files.map((ele, idx) => {
      const url = "/images/" + ele.filename;
      return "/images/" + ele.filename;
    });

    const newProducts = await ProductModel({
      banner: fullUrl,
      thumbnail: fullUrl[0],
      title: req.body.title,
      decs: req.body.decs,
      typeCategories: req.body.typeCategories,
    });

    await newProducts.save();
    if (!res.status(201)) {
      console.log(`Save New Products error`);
    } else res.status(201).json(newSave);
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
    const detail = await ProductModel.findById(id);
    console.log('detail: ', detail);

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