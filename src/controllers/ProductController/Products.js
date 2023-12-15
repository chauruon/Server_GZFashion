import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs";

/**
 * Tạo mới sản phẩm
 * @param {id}
 */

export const NewProducts = async (req, res) => {
  console.log('req: ', req);
  try {
    const fullUrl = req.files.map((ele, idx) => {
      const url = "/images/" + ele.filename;
      return "/banner_product/" + ele.filename;
    });
    
    const newProducts = await ProductModel({
      banner: fullUrl,
      thumbnail: fullUrl[0] != undefined ? fullUrl[0] : null,
      title: req.body.title,
      decs: req.body.decs,
      categories: req.body.categories,
    });

    await newProducts.save();
    if (!res.status(201)) {
      console.log(`Save New Products error`);
    } else res.status(201).json({status:true ,product: newProducts});
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({status:false, message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
};

export const GetDetadilProducsts = async (req, res) => {
  const { id } = req.params;
  const lengthId = id.length;
  
  try {
    let detail = null;
    if (lengthId == 24) detail = await ProductModel.findById(id);

    if (!detail) {
      return res.status(404).json({ status: false, message: 'Product not found' });
    } else {
      return res.status(200).json({ status: true, product: detail });
    }
    } catch (e) {
      console.log('Error:', e);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

export const AllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed

    const skip = (page - 1) * pageSize;

    const totalProducts = await ProductModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await ProductModel.find({}).skip(skip).limit(pageSize);

    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get all products error!" });
    } else {
      res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalProducts,
        products,
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};


/**
 * Remove all product
 */
export const RemoveProduct = async (req,res) => {
	await ProductModel.deleteMany();

	if (!res.status(200)) {
    res.status(500).json(
      {
        status:false,
        message:"Vui lòng hỏi Admin!"
      }
    );
	} else res.status(200).json(
    {
      status:true,
      message:"Xóa sản phẩm thành công!"
    }
  );
}



export const SoftDeleteByIDProduct = async (req, res) => {
  console.log('req.params: ', req.params);
  console.log('req.query: ', req.query);
  console.log('req.body: ', req.body);
  try {

    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get all products error!" });
    } else {
      res.status(200).json({
        status: true,
        // prodaSD, 
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};
