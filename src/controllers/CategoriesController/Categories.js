import moment from "moment";
import CryptoJS from "crypto-js";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";
import { VeryfiToken } from "../../middleware/generate_token.js"
export const currentDate = moment().unix();

export const UpdateAndNewCategories = async (req, res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const urlIcon = typeof req.file !== "undefined" ? "/categories_icon/" + req.file.filename : "";
      const ojbImage = {
        type: req.body.type ? req.body.type : '',
        title: req.body.title ? req.body.title : "",
        icon: typeof req.file !== "undefined" ? urlIcon : "",
        create_at: currentDate,
      };

      if (req.query.id) {
        const updateCategories = await CategoriesModel.findByIdAndUpdate(req.query.id, {$set: ojbImage},{new:true});
        if (updateCategories !== null) {
          res.status(200).json({
            status: true,
            message: "Đã cập nhật thông tin thành công!",
            categories: updateCategories,
          });
        }else{
          res.status(409).json({
            status: false,
            message: "Vui lòng kiểm trả id sản phẩm!",
          });
        }
      }else{
        const newCategories = await CategoriesModel( ojbImage);
          await newCategories.save();
        if (!res.status(200)) {
        } else res.status(200).json({
          status: true,
          message: "Thể loại sản phẩm đã tạo thành công!",
          categories: newCategories,
        });
      }
    }else {
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({
			status: false,
			message: e.message
		});
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
};

export const GetCategories = async (req,res) => {
	try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed

      const skip = (page - 1) * pageSize;

      const totalCategory = await CategoriesModel.countDocuments({});
      const totalPages = Math.ceil(totalCategory / pageSize);
      
      const categoriesArr = await CategoriesModel.find({}).skip(skip).limit(pageSize);

      res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalCategory,
        categories: categoriesArr,
      });
    }else {
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

export const DeleteCategories = async (req,res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      await CategoriesModel.deleteMany();
    
      if (!res.status(200)) {
        res.status(400).json({
          status: false,
          message: "Vui lòng kiểm tra thông tin!",
        });
      } else res.status(200).json({
        status: true,
        message: "Xóa categories thành công!",
      });
    }else {
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