import moment from "moment";
import CryptoJS from "crypto-js";
import {DownloadCVModel} from "../../models/CVModels/DownloadCV.js"





export const UpFileCV = async (req, res) => {
  try {
    const unixTimeInMillis = moment().valueOf();
    const dateWithTime = moment(unixTimeInMillis);
    const formattedDate = dateWithTime.format('DD-MM-YYYY HH:mm:ss.SSS');
    
    const cvFile = typeof req.file !== "undefined" ? "/download/" + req.file.filename : "";
    const remove = await DownloadCVModel.deleteMany();
    console.log('remove: ', remove);
    let newCV = null;
    if (remove.acknowledged === true) {
      newCV = await DownloadCVModel({
        file: cvFile,
        create_at:unixTimeInMillis,
        date: formattedDate
      });
      await newCV.save();
    }
    
    res.status(200).json({
      status: true,
      cv: newCV,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: "Vui lòng liên hệ admin",
    });
  }
};

export const DownloadFileCV = async (req,res) => {
  try {
    const CV = await DownloadCVModel.find({}).sort({ create_at: -1 }); 
    console.log('date: ', CV);
    // console.log('CV: ', CV);

    if (!res.status(200)) {
      res.status(400).json({
        status: false,
        message: "Vui lòng liêm hệ admin",
      });
    } else res.status(200).json({
      status: true,
      cv: CV,
    });

  } catch (e) {
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}



export const DeleteCV = async (req,res) => {
  try {
    await DownloadCVModel.deleteMany();
    
    if (!res.status(200)) {
      res.status(400).json({
        status: false,
        message: "Vui lòng liêm hệ admin",
      });
    } else res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công!",
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

