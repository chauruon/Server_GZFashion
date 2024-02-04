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
    const newShoppingCart = await ShoppingCartModel({ojb});
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
    const carts = await ShoppingCartModel.find({});
    // console.log('carts: ', carts);

    const pro = carts.map((value,index) => {
      console.log('value: ', value);
      // console.log('index: ', index);
      // console.log('value.shopping_cart: ', value.shopping_cart[index]);
      // console.log("🚀 ~ pro ~ value:", value)
        const element = {
      	  id_shopping_cart: value._id,
      	  // id_product: value.shopping_cart[index]._id ? value.shopping_cart[index]._id : "",
      	  thumbnail: value.shopping_cart[index].thumbnail ? value.shopping_cart[index].thumbnail : "" ,
      	  creat_at: value.shopping_cart[index]?.creat_at,
      	  title: value.shopping_cart[index].title ? value.shopping_cart[index].title : "",
      	  decs: value.shopping_cart[index].decs ? value.shopping_cart[index].decs : "",
      	  uuid: value.shopping_cart[index].uuid ? value.shopping_cart[index].uuid : "",
      	}
    	return {};
    });
    console.log("🚀 ~ pro ~ pro:", pro)

    if (!res.status(200)) {
      console.log(`Get shopping cart error`);
    } else res.status(200).json({
      status: true,
      shopping_cart: pro,
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

