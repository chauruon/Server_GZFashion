import moment from "moment";
import { Schema, SchemaTypeOptions, SchemaTypes } from "mongoose";
import BannerNotifyModel from "../../models/NotifyModels/BannerNotify.js";
import CryptoJS from "crypto-js";




export const UploadBannerNotify = async (req, res) => {
  const CurrentDate = moment().unix();
  const fullUrl = "/banner_notify/" + req.file.filename;
  try {
    const ojbImage = {
      id: CryptoJS.AES.encrypt(`${CurrentDate}`,process.env.ACCESS_SECRET).toString(),
      image: fullUrl,
      createAt: CurrentDate,
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
			} else res.status(201).json(newBanner);
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
