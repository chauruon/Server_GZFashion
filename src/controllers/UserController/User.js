import UserModel from "../../models/UserModels/UserModel.js";
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { encryptHex, decryptHex } from "../../utils/Common.js"
import {
  verifyRefreshToken,
  generateTokens,
  VeryfiToken,
} from "../../middleware/generate_token.js"


export const RegisterUser = async (req, res) => {
  const{num_phone, username,password, address, is_admin} = req.body;
  const passwordHex = encryptHex(password);

  const newPost = new UserModel({
    num_phone : num_phone !== undefined ? num_phone : 0,
    username : username,
    is_admin : is_admin ? is_admin : false,
    password : passwordHex,
    address: address !== undefined ? address : " ",
    uuid: uuidv4(),
  });
  const duplicateUser = await UserModel.findOne({username: username})
  
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
        message:"Tài khoản đã tồn tại!",
      });
    }
  
    if (!res.status(200)) {
      console.log(`RegisterUser error`);
    }
  } catch (e) {
    // console.log("🚀 ~ file: User.js:7 ~ RegisterUser ~ error", e)
    res.status(409).json({message: e.message})
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const LoginUser = async (req, res) => {
  const{username, password, is_admin} = req.body;
  try {
    // const access_token = Jwt.sign({id: UserModel._id},process.env.ACCESS_SECRET_TOKEN,{expiresIn:"3d"});
    var loginUser = await UserModel.findOne({username : username})
    const hashPass = decryptHex(loginUser.password);
    if (hashPass === password) {
      const token = generateTokens({
        username: username,
        is_admin: is_admin ? is_admin : false,
        uuid: loginUser !== null ? loginUser.uuid : ""
      })
      console.log('token: ', token);

      res.status(200).json({
        status: true,
        user:{
          token,
          ...loginUser._doc
        }
      });
    }else{
      res.status(200).json({
        status: false,
        message:"Vui lòng kiểm tra mật khẩu!",
      });
    }
  } catch (e) {
    if (loginUser == null){
      return res.status(400).json({
        status: false,
        message:"Tài khoản không tồn tại!",
      });
    }
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const UpdateUser = async (req, res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined") {
      const fullUrl = typeof req.file !== "undefined" ? "/avatar/" + req.file.filename : "";
      const update = await UserModel.findByIdAndUpdate(req.query.id, {$set: {
        username: req.body.username,
        password: req.body.password,
        name: (typeof req.body.name !== "undefined") ? req.body.name : "",
        address: (typeof req.body.address !== "undefined") ? req.body.address : "",
        num_phone:  (typeof req.body.num_phone !== "undefined") ? req.body.num_phone : "",
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
    }else{
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
  } catch (e) {
    console.log('error: ', e);
    res.status(409).json({message: e.message});
    res.status(400).json({
      status: false,
      message:"Vui lòng liêm hệ admin",
    });
  }
}

export const DeleteUsers = async (req,res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined") {
      await UserModel.deleteMany();
    
      if (!res.status(200)) {
        console.log(`delete users error`);
      } else res.status(200).json({
        status: true,
        message: "Xóa users thành công!",
      });
    }else{
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
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
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const { userid } = req.body;
      const list = await UserModel.find({});

      if (!res.status(200)) {
        return res.status(200).json({
          status: true,
          message: "Vui lòng kiểm tra thông tin!",
        });
      } else res.status(200).json({
        status: true,
        users: list,
      });
    }else{
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
  } catch (e) {
    res.status(409).json({status: false, message: e.message });
    res.status(400).json({
      status: false,
      message: "Vui lòng liêm hệ admin",
    });
  }
}
