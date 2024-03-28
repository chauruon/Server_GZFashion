import moment from "moment";
import { Schema, SchemaTypeOptions, SchemaTypes } from "mongoose";
import BannerNotifyModel from "../../models/NotifyModels/BannerNotify.js";
import CryptoJS from "crypto-js";
import {
  categoriesImage,
} from "../../middleware/storageImage.js"
import { VeryfiToken } from "../../middleware/generate_token.js"

export const UploadBannerNotify = async (req, res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const currentDate = moment().unix();
      const fullUrl = "/banner_notify/" + req.file.filename;
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

        if (!res.status(200)) {
          console.log(`Lưu sản phẩm không thành công`);
        } else res.status(200).json({
          status: true,
          banners :newBanner,
        });
      }
    }else {
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
};

export const GetBannerNotify = async (req, res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed
  
      const skip = (page - 1) * pageSize;
  
      const totalBanner = await BannerNotifyModel.countDocuments({});
      const totalPages = Math.ceil(totalBanner / pageSize);
      
      const detail = await BannerNotifyModel.find({}).skip(skip).limit(pageSize);
      // const detail = await BannerNotifyModel.findOne({});
      if (!res.status(200)) {
        console.log(`Get Banner Notify error`);
      } else res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalBanner,
        banner: detail
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
};

export const DeleteBanners = async (req, res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      await BannerNotifyModel.deleteMany();
    
      if (!res.status(200)) {
        res.status(400).json({
          status: false,
          message: "Vui lòng kiểm tra thông tin!",
        });
      } else res.status(200).json({
        status: true,
        message: "Xóa banner thành công!",
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
      message: "Vui lòng liêm hệ admin",
    });
  }
}
