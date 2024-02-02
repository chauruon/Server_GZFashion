import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const currentDate = moment().unix();

const ShoppingCart = mongoose.Schema({
  shopping_cart: {
    type: SchemaTypes.Array,
    require: true,
  },
},{versionKey: false });
const ShoppingCartModel = mongoose.model("shopping_cart", ShoppingCart);
export default ShoppingCartModel;
