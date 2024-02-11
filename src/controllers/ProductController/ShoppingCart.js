import ShoppingCartModel from "../../models/ProductModels/ShoppingCart.js"
import ProductModel from "../../models/ProductModels/ProductModels.js";

export const ShoppingCart = async (req,res) => {
  const { id, uuid } = req.body;
  if (id) {
    const cart = await ProductModel.findById(id).populate("categories");
    console.log('cart: ', cart);
    const id_product = cart._id;
    const ojb = {
      // banner: fullUrl ? fullUrl : "",
      // thumbnail: fullUrl[0] ? fullUrl[0] : "",
      title: req.body.title ? req.body.title : "", 
      decs: req.body.decs ? req.body.decs : "",
      // categories: newCategories._id,
    };
    const newShoppingCart = await ShoppingCartModel({cart});
		await newShoppingCart.save();

    if (!res.status(200)) {
      console.log(`Lưu giỏ hàng không thành công`);
    } else res.status(200).json({
      status: true,
      newShoppingCart,
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

