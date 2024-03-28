import ShoppingCartModel from "../../models/ProductModels/ShoppingCart.js"
import ProductModel from "../../models/ProductModels/ProductModels.js";
import { VeryfiToken } from "../../middleware/generate_token.js"


export const ShoppingCart = async (req,res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const { product_id, user_id  } = req.body;
      if (product_id && user_id) {
        const shoppingCartModel = await ShoppingCartModel.findById(product_id).populate("users").populate("categories");

        if (shoppingCartModel === null) {
          const cart = await ProductModel.findById(product_id).populate("categories");
          const ojb = {
            users: user_id,
            ...cart._doc,
          };

          const newShoppingCart = await ShoppingCartModel(ojb);
          await newShoppingCart.save();

          if (!res.status(200)) {
            res.status(409).json({
              status: true,
              message: "Thêm giỏ hàng không thành công!"
            });
          } else res.status(200).json({
            status: true,
            message: "Thêm giỏ hàng thành công!",
            product: newShoppingCart,
          });
        }else{
          res.status(200).json({
            status: true,
            message: "Sản phẩm đã tồn tại trong giở hàng của bạn!",
          });
        }
      }
    }else {
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
  } catch (e) {
    res.status(409).json({ status: false,message: e.message });
  }
}

export const GetShoppingCart = async (req,res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      const { user_id } = req.body;
      const page = parseInt(req.query.page) || 1; // Get the page from the query parameters, default to 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Set the default page size to 10, you can adjust it as needed
      const skip = (page - 1) * pageSize;
      const totalCart = await ShoppingCartModel.countDocuments({});
      const totalPages = Math.ceil(totalCart / pageSize);
      const carts = await ShoppingCartModel.find({ users:user_id}).populate("users").populate("categories").skip(skip).limit(pageSize);

      if (!res.status(200)) {
        res.status(400).json({
          status: false,
          message: "Vui lòng liêm hệ admin",
        });
      } else res.status(200).json({
        status: true,
        page,
        pageSize,
        totalPages,
        totalCart,
        shopping_carts: carts,
      });
    }else {
      return res.status(401).json({
        status: false,
        message: "Token không hợp lệ!",
      });
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
}


export const DeleteShoppingCart = async (req,res) => {
  try {
    const veryfi_token = VeryfiToken(req,res);
    if ( typeof veryfi_token !== "undefined"){
      await ShoppingCartModel.deleteMany();
    
      if (!res.status(200)) {
        res.status(400).json({
          status: true,
          message: "Vui lòng kiểm tra thông tin!",
        });
      } else res.status(200).json({
        status: true,
        message: "Xóa giỏ hàng thành công!",
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
}

