import UserModel from "../../models/UserModels/UserModel.js";
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";
import fs from "fs"

export const RegisterUser = async (req, res) => {
  const{numPhone, username,password, address} = req.body;

  const newPost = new UserModel({
    numPhone : numPhone,
    username : username,
    isAdmin : false,
    password : CryptoJS.AES.encrypt(password,process.env.ACCESS_SECRET).toString(),
    address : address,
  });
  try {
    await newPost.save();
    if (!res.status(201)) {
      console.log(`RegisterUser error`);
    }
    res.status(201).json(newPost);
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
    let fullUrl = "/images/" + req.file.filename;
    const update = await UserModel.findByIdAndUpdate(req.body.id, {$set: {
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