import UserModel from "../../models/UserModels/UserModel.js";
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";
import fs from "fs";
import moment from "moment";

const currentDate = moment().unix();

export const RegisterUser = async (req, res) => {
  const{num_phone, username,password, address} = req.body;

  const newPost = new UserModel({
    num_phone : num_phone,
    username : username,
    is_admin : false,
    password : CryptoJS.AES.encrypt(password,process.env.ACCESS_SECRET).toString(),
    address : address,
  });
  try {
    await newPost.save();
    if (!res.status(201)) {
      console.log(`RegisterUser error`);
    }
    res.status(201).json({
      status: true,
      user: newPost
    });
  } catch (e) {
    console.log("🚀 ~ file: User.js:7 ~ RegisterUser ~ error", e)
    res.status(409).json({status: false,message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const LoginUser = async (req, res) => {
  const{username,password} = req.body;
  try {
    const accessToken = Jwt.sign({id: UserModel._id},process.env.ACCESS_SECRET_TOKEN,{expiresIn:"3d"});
    const loginUser = await UserModel.findOne({username : username})
    const hashPass = CryptoJS.AES.decrypt(loginUser.password,process.env.ACCESS_SECRET).toString(CryptoJS.enc.Utf8);

    if (!res.status(201)) {
      console.log(`RegisterUser error`);
    }
    if (hashPass === password) {
      res.status(201).json({accessToken,...loginUser._doc});
    }else{
      res.status(201).json({
        status: false,
        message:"Vui lòng kiểm tra tài khoản hoặc mật khẩu!",
      });
    }
  } catch (e) {
    console.log("🚀 ~ file: User.js:7 ~ RegisterUser ~ error", e)
    res.status(409).json({message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const UpdateUser = async (req, res) => {
  try {
    let { id } = req.body;
    let fullUrl = typeof req.file != 'undefined' ? "/images/" + req.file?.filename : '';
    let update = null
    if (typeof id != 'undefined' ) {
      update = await UserModel.findByIdAndUpdate(id, {$set: {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        numPhone: req.body.numPhone,
        avatar: fullUrl != '' ? fullUrl : ''
      }},{new:true});
    }else{
      res.status(409).json({
        status: false,
        message: "Vui lòng cung cấp id người dùng!",
      });
    }
    
    if (update !== null) {
      res.status(200).json({
        status: true,
        message: "Đã cập nhật thông tin thành công!",
        user: update
      });
    }
  } catch (e) {
    console.log('error: ', e);
    // res.status(409).json({status: false,message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const ListUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed

    const skip = (page - 1) * pageSize;

    const totalUsers = await UserModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / pageSize);

    const list = await UserModel.find({}).skip(skip).limit(pageSize);
    
    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get all products error!" });
    } else {
      const users = list.filter((val) => val.isDeleted !== true);
      res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalUsers,
        users,
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};


export const RemoveUsers = async (req,res) => {
	await UserModel.deleteMany();

	if (!res.status(200)) {
    res.status(500).json(
      {
        status:false,
        message:"Vui lòng hỏi Admin!"
      }
    );
	} else res.status(200).json(
    {
      status:true,
      message:"Xóa người dùng thành công!"
    }
  );
}


export const SoftDeleteUser = async (req, res) => {
  const { id } = req.params;
  const { isDeleted } = req.body;
  try {
    let softDelete = await UserModel.findByIdAndUpdate(id,{
      $set:{
        isDeleted,
        delete_date: isDeleted === true ? currentDate : null
      }
    },{new: true});
    
    if (!res.status(200)) {
      res.status(200).json({ status: false, message: "Get all products error!" });
    } else {
      res.status(200).json({
        status: true,
        product: softDelete 
      });
    }
  } catch (e) {
    console.log("e: ", e);
    res.status(409).json({ status: false, message: e.message });

    res.status(500).json({ status: false, message: e.message });
  }
};

export const Profile = async (req,res)=>{
  try {
    let { id } = req.params;
    let update = null
    if (typeof id != 'undefined' ) {
      update = await UserModel.findById(id);
    }else{
      res.status(409).json({
        status: false,
        message: "Vui lòng cung cấp id người dùng!",
      });
    }
    
    if (update !== null) {
      res.status(200).json({
        status: true,
        user: update
      });
    }
  } catch (e) {
    console.log('error: ', e);
    // res.status(409).json({status: false,message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}