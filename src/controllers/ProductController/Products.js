import ProductModel from "../../models/ProductModels/ProductModels.js";
import moment from "moment";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";
import {
  VeryfiToken,
} from "../../middleware/generate_token.js"


export const currentDate = moment().unix();


/**
 * Tạo mới sản phẩm
 * @param {id}
*/
export const NewProducts = async (req, res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined") {
      const bannerFiles = req.files['banner'];
      const thumbnailFile = bannerFiles[0];
      const bannerUrls = bannerFiles.map((file) => {
        return "/banner_product/" + file.filename;
      });
      const iconFile = req.files['icon'][0];
      const iconUrl = "/categories_icon/" + iconFile.filename;
      const checkType = CategoriesModel.findOne({type: req.body.typeCate});

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
    }else {
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
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
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined") {
      const detail = await ProductModel.findById(id).populate("categories");

      if (!res.status(200)) {
        console.log(`Get Detadil Producsts error`);
      } else res.status(200).json({
        status: true,
        detail: detail,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
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
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined") {
      const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed
      const skip = (page - 1) * pageSize;
      const totalProducts = await ProductModel.countDocuments({});
      const totalPages = Math.ceil(totalProducts / pageSize);
      const products = await ProductModel.find({}).populate("categories").skip(skip).limit(pageSize);

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
    }else{
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
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
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined") {
      await ProductModel.deleteMany();
    
      if (!res.status(200)) {
        console.log(`delete products error`);
      } else res.status(200).json({
        status: true,
        message: "Xóa sản phẩm thành công!",
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}
