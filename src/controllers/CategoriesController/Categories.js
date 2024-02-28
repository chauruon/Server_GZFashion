import moment from "moment";
import CryptoJS from "crypto-js";
import CategoriesModel from "../../models/CategoriesModel/Categories.js";

export const currentDate = moment().unix();

export const UpdateAndNewCategories = async (req, res) => {
  try {
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
      if (!res.status(201)) {
      } else res.status(201).json({
        status: true,
        message: "Thể loại sản phẩm đã tạo thành công!",
        categories: newCategories,
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
		const categoriesArr = await CategoriesModel.find({});
		res.status(200).json({
      status: true,
      categories: categoriesArr,
    });
	} catch (e) {
		console.log('GetCategories err: ', e);
		res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
	}
}

export const DeleteCategories = async (req,res) => {
  try {
    await CategoriesModel.deleteMany();
    
    if (!res.status(200)) {
      console.log(`delete categories error`);
    } else res.status(200).json({
      status: true,
      message: "Xóa categories thành công!",
    });
  } catch (e) {
    res.status(409).json({ message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}