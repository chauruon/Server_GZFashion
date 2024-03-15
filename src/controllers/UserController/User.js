import UserModel from "../../models/UserModels/UserModel.js";
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export const RegisterUser = async (req, res) => {
  const{num_phone, username,password, address} = req.body;
  // const uuidv4 = uuidv4();
  // console.log('saf: ', saf);
  const newPost = new UserModel({
    num_phone : num_phone,
    username : username,
    is_admin : false,
    password : CryptoJS.AES.encrypt(password,process.env.ACCESS_SECRET).toString(),
    address : address,
    uuid: uuidv4(),
  });
  const duplicateUser = await UserModel.findOne({username : username})
  try {
    if (!duplicateUser) {
      await newPost.save();
      res.status(200).json({
        status: true,
        user: newPost,
      });
    }else{
      res.status(400).json({
        status: false,
        message:"Duplicate user!",
      });
    }
  
    if (!res.status(200)) {
      console.log(`RegisterUser error`);
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

export const LoginUser = async (req, res) => {
  const{username,password} = req.body;
  try {
    const accessToken = Jwt.sign({id: UserModel._id},process.env.ACCESS_SECRET_TOKEN,{expiresIn:"3d"});
    const loginUser = await UserModel.findOne({username : username})
    const hashPass = CryptoJS.AES.decrypt(loginUser.password,process.env.ACCESS_SECRET).toString(CryptoJS.enc.Utf8);

    if (!res.status(200)) {
      console.log(`RegisterUser error`);
    }
    if (hashPass === password) {
      res.status(200).json({
        status: true,
        user:{
          accessToken,
          ...loginUser._doc
        }
      });
    }else{
      res.status(200).json({
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
    const fullUrl = typeof req.file !== "undefined" ? "/avatar/" + req.file.filename : "";
    const update = await UserModel.findByIdAndUpdate(req.query.id, {$set: {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      address: req.body.address,
      numPhone: req.body.numPhone,
      avatar: fullUrl
    }},{new:true});

    
    if (update !== null) {
      res.status(200).json({
        status: true,
        message: "Đã cập nhật thông tin thành công!",
      });
    }else{
      res.status(409).json({
        status: false,
        message: "Cập nhật thông tin không thành công!",
      });
    }
  } catch (e) {
    console.log('error: ', e);
    res.status(409).json({message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const DeleteUsers = async (req,res) => {
  try {
    await UserModel.deleteMany();
    
    if (!res.status(200)) {
      console.log(`delete users error`);
    } else res.status(200).json({
      status: true,
      message: "Xóa users thành công!",
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


export const GetUsers = async (req,res) => {
  try {
    const { userid } = req.body;
    const list = await UserModel.find({});

    if (!res.status(200)) {
      console.log(`Get list users error`);
    } else res.status(200).json({
      status: true,
      users: list,
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
