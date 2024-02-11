import ShoppingCartModel from "../../models/ProductModels/ShoppingCart.js"
import ProductModel from "../../models/ProductModels/ProductModels.js";

export const ShoppingCart = async (req,res) => {
  try {
    const { id_product, userid  } = req.body;
    if (id_product && userid) {
      const shoppingCartModel = await ShoppingCartModel.findById(id_product);
      if (!shoppingCartModel._id) {
        const cart = await ProductModel.findById(id_product).populate("categories");
        const ojb = {
          userid: userid,
          ...cart,
        };
        const newShoppingCart = await ShoppingCartModel(ojb._doc);
        await newShoppingCart.save();

        if (!res.status(200)) {
          console.log(`Lưu giỏ hàng không thành công`);
        } else res.status(200).json({
          status: true,
          product: newShoppingCart,
        });
      }else{
        res.status(200).json({
          status: true,
          message: "Sản phẩm đã tồn tại trong giở hàng!",
        });
      }
      console.log('shoppingCartModel: ', shoppingCartModel);
      
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

export const GetShoppingCart = async (req,res) => {
  try {
    const { userid } = req.body;
    const carts = await ShoppingCartModel.find({});
    console.log('carts: ', carts);

    if (!res.status(200)) {
      console.log(`Get shopping cart error`);
    } else res.status(200).json({
      status: true,
      shopping_carts: carts,
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
