import moment from "moment";
import { Schema, SchemaTypeOptions, SchemaTypes } from "mongoose";
import MenusModel from "../../models/Category/MenuModels.js";
import CryptoJS from "crypto-js";

/**
 * Up menu
 */
export const UploadMenus = async (req,res) => {
  const CurrentDate = moment().unix();
	
  const fullUrl = "/menus/" + req.file.filename;
	const {title,type } = req.body;
	const ojbImage = {
		id: btoa(CryptoJS.AES.encrypt(`${CurrentDate}`,process.env.ACCESS_SECRET)).toString(),
		image: fullUrl,
		title: title,
		type_menu: type,
		createAt: CurrentDate,
	};
	const newBanner = await MenusModel({ menu: ojbImage });
	await newBanner.save();

	if (!res.status(201)) {
		console.log(`Lưu sản phẩm không thành công`);
	} else res.status(201).json(newBanner);
}


/**
 * Get all menu
 */
export const ListMenus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed

    const skip = (page - 1) * pageSize;

    const totalProducts = await MenusModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / pageSize);

    const cate = await MenusModel.find({}).skip(skip).limit(pageSize);
    let list = [];

    cate.map((val,idx)=>{
      let _id = val._id;
      list = [{_id,...val.menu[idx]}];
    });

    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get menus error!" });
    } else {
      res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalProducts,
        menus: list
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};


/**
 * Remove all menu
 */
export const RemoveMenus = async (req,res) => {
	await MenusModel.deleteMany();

	if (!res.status(200)) {
	} else res.status(200).json({status:true,message:"Xóa thành công!"});
}

export const detailMenu = async (req, res) => {
  const { id } = req.params;
  const lengthId = id.length;
  
  try {
    let detail = await MenusModel.findById(id);

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