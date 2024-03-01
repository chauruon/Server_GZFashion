import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const currentDate = moment().unix();

const ShoppingCart = mongoose.Schema({
  thumbnail: {
    type: SchemaTypes.Mixed,
  },
  title:{
    type: SchemaTypes.String,
    require: true,
    maxLength: 5,
  },
  decs:{
    type: SchemaTypes.String,
  },
  banner:{
    type: SchemaTypes.Array,
  },
  create_at: {
    type: Number,
    default: currentDate,
  },
  users:{
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  categories:{
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  price: {
    type: Number,
    default: 0,
  },
  sale_off: {
    type: Number,
    default: 0,
  },
},{versionKey: false });
const ShoppingCartModel = mongoose.model("shopping_cart", ShoppingCart);
export default ShoppingCartModel;
