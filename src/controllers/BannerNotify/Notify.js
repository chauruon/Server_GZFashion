import moment from "moment";
import { Schema, SchemaTypeOptions, SchemaTypes } from "mongoose";
import BannerNotifyModel from "../../models/NotifyModels/BannerNotify.js";
import CryptoJS from "crypto-js";
import {
  categoriesImage,
} from "../../middleware/storageImage.js"


export const UploadBannerNotify = async (req, res) => {
  const currentDate = moment().unix();
  const fullUrl = "/banner_notify/" + req.file.filename;
  try {
    const ojbImage = {
      id: CryptoJS.AES.encrypt(`${currentDate}`,process.env.ACCESS_SECRET).toString(),
      image: fullUrl,
      create_at: currentDate,
    };
		if (req.body.id) {
			let updateBanner = null;
			const find = await BannerNotifyModel.findOne({_id: req.body.id});
			if (find) {
				updateBanner = await BannerNotifyModel.findByIdAndUpdate(req.body.id,{
					$set:{banner: [...find.banner,ojbImage]}
				},{new: true})
			}
			if (updateBanner !== null) {
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
		} else {
			const newBanner = await BannerNotifyModel({ banner: ojbImage });
			await newBanner.save();

			if (!res.status(201)) {
				console.log(`Lưu sản phẩm không thành công`);
			} else res.status(201).json({
        status: true,
        banners :newBanner,
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

export const GetBannerNotify = async (req, res) => {
  try {
    const detail = await BannerNotifyModel.findOne({});
    if (!res.status(201)) {
      console.log(`Get Banner Notify error`);
    } else res.status(201).json(detail);
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
};

export const DeleteBanners = async (req, res) => {
  try {
    await BannerNotifyModel.deleteMany();
    
    if (!res.status(200)) {
      console.log(`delete products error`);
    } else res.status(200).json({
      status: true,
      message: "Xóa banner thành công!",
    });
  } catch (e) {
    console.log('e: ', e);
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}

export const createCateByProduct = async (isfile) => {
  console.log('isfile: ', isfile);
  // const categories_image = multer({ storage: categoriesImage });

  // console.log('req?.file: ', req?.file);
  // const fullUrl = "/banner_notify/" + req?.file?.filename;

}