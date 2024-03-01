import ShoppingCartModel from "../../models/ProductModels/ShoppingCart.js"
import ProductModel from "../../models/ProductModels/ProductModels.js";

export const ShoppingCart = async (req,res) => {
  try {
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
  } catch (e) {
    res.status(409).json({ status: false,message: e.message });
  }
}

export const GetShoppingCart = async (req,res) => {
  try {
    const { user_id } = req.body;
    const carts = await ShoppingCartModel.find({ users:user_id}).populate("users").populate("categories");

    if (!res.status(200)) {
      res.status(400).json({
        status: false,
        message: "Vui lòng liêm hệ admin",
      });
    } else res.status(200).json({
      status: true,
      shopping_carts: carts,
    });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
}


export const DeleteShoppingCart = async (req,res) => {
  try {
    await ShoppingCartModel.deleteMany();
    
    if (!res.status(200)) {
      console.log(`delete products error`);
    } else res.status(200).json({
      status: true,
      message: "Xóa giỏ hàng thành công!",
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

