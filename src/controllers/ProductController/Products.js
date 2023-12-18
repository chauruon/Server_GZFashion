import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import Jwt from "jsonwebtoken";
import fs from "fs";
const currentDate = moment().unix();
/**
 * Tạo mới sản phẩm
 * @param {id}
 */

export const NewProducts = async (req, res) => {
  try {
    const {title,decs,category} = req.body;
    const fullUrl = req.files.map((ele, idx) => {
      const url = "/images/" + ele.filename;
      return "/banner_product/" + ele.filename;
    });
    
    const newProducts = await ProductModel({
      banner: fullUrl,
      thumbnail: fullUrl[0] != undefined ? fullUrl[0] : null,
      title,
      decs,
      // category,
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

    const products = await ProductModel.find({}).populate('user_favorite').skip(skip).limit(pageSize);

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
  const { id } = req.params;
  const { isDeleted } = req.body;
  try {
    let softDelete = await ProductModel.findByIdAndUpdate(id,{
      $set:{
        isDeleted,
        delete_date: isDeleted === true ? currentDate : null
      }
    },{new: true});
    
    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get all products error!" });
    } else {
      res.status(200).json({
        status: true,
        product: softDelete 
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};


/**
 * Popular Product
 */
export const PapularProduct = async (req, res) => {
  try {
    // nếu lấy 5 item
    // http://localhost:8700/api/v1/papular_product/false
    // nếu lấy hết
    // http://localhost:8700/api/v1/papular_product/true?skip=1&limit=10
    const allList = req.params.all;

    const page = parseInt(req.query.skip) || 1; // Get the page from the query parameters, default to 1 if not provided
    const pageSize = parseInt(req.query.limit) || 10; // Set the default page size to 10, you can adjust it as needed

    const skip = (page - 1) * pageSize;
    const totalProducts = await ProductModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / pageSize);
    
    const products = await ProductModel.find({}).populate('user_favorite').skip(skip).limit(pageSize);

    const papular = products.sort((first ,second)=> second.quantity_purchased - first.quantity_purchased);
    const list_product = papular.filter((val,index) => index <= 5 && val.quantity_purchased !== 0);
    
    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get all products error!" });
    } else {
      res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalProducts,
        products: allList == 'true' ? papular : list_product,
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};

export const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let update = null
    if (typeof id != 'undefined' ) {
      update = await ProductModel.findByIdAndUpdate(id, {$set: req.body},{new:true});
    }else{
      res.status(409).json({
        status: false,
        message: "Vui lòng cung cấp id người dùng!",
      });
    }
    
    if (update !== null) {
      res.status(200).json({
        status: true,
        message: "Đã cập nhật thông tin thành công!",
        product: update
      });
    }
  } catch (e) {
    console.log('error: ', e);
    // res.status(409).json({status: false,message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}