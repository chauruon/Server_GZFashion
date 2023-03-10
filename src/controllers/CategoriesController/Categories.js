import moment from "moment";
import CryptoJS from "crypto-js";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";
import mongoose from "mongoose";

export const CurrentDate = moment().unix();

export const UpNewCategories = async (req, res) => {
  try {
    const ojbImage = {
      type: req.body.type,
      title: req.body.title,
      createAt: CurrentDate,
    };
    const CategoriesModelssss = await CategoriesModel.find({});

		if (CategoriesModelssss.length > 0) {
			if (req.body.id) {
				const updateCategories = await CategoriesModel.findByIdAndUpdate(req.body.id, {$set: ojbImage},{new:true});
				if (updateCategories !== null) {
					res.status(200).json({
						status: true,
						message: "Đã cập nhật thông tin thành công!",
					});
				}else{
					res.status(409).json({
						status: false,
						message: "Vui lòng kiểm trả id sản phẩm!",
					});
				}
			} else  {
				const newCategories = await CategoriesModel({ categories: ojbImage });
				await newCategories.save();
				
				if (!res.status(201)) {
					// console.log(`Lưu thể loại sản phẩm không thành công`);
				} else res.status(201).json(newCategories);
			}
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



export const NewCategories = async (req, res) => {
  try {
		const ojb = {
      type: req.body.type,
      title: req.body.title,
      createAt: CurrentDate,
    };
    const newCategories = await CategoriesModel(ojb);

    await newCategories.save();
    if (!res.status(201)) {
      console.log(`Save New Categories error`);
    } else res.status(201).json(newCategories);
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
};


export const GetCategories = async (req,res) => {
	try {
		const categoriesArr = await CategoriesModel.find({});
		res.status(201).json(categoriesArr);
	} catch (e) {
		console.log('GetCategories err: ', e);
		res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
	}
}
