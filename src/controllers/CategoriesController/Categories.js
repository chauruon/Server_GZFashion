import moment from "moment";
import CryptoJS from "crypto-js";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";
import mongoose from "mongoose";




export const UpNewCategories = async (req, res) => {
  const CurrentDate = moment().unix();
  try {
    const ojbImage = {
      id: req.body.type,
      title: req.body.title,
      createAt: CurrentDate,
    };
    const CategoriesModelssss = await CategoriesModel.find({});

		if (CategoriesModelssss.length > 0) {
			if (req.body.id) {
				let updateCategories = null;
				const find = await CategoriesModel.findOne({_id: req.body.id});
				if (find) {
					updateCategories = await CategoriesModel.findByIdAndUpdate(req.body.id,{
						$set:{categories: [...find.categories,ojbImage]}
					},{new: true})
				}
				if (updateCategories !== null) {
					res.status(200).json({
						status: true,
						message: "Đã cập nhật thông tin thành công!",
					});
				}
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
				console.log(`Lưu sản phẩm không thành công`);
			} else res.status(201).json(newCategories);
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
    const newProducts = await CategoriesModel({
      type: req.body.type,
      title: req.body.title,
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
