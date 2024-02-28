import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const currentDate = moment().unix();

const ShoppingCart = mongoose.Schema({
  thumbnail: {
    type: SchemaTypes.Mixed,
    // require: true,
  },
  title:{
    type: SchemaTypes.String,
    require: true,
    maxLength: 100,
  },
  decs:{
    type: SchemaTypes.String,
    // require: true,
  },
  banner:{
    type: SchemaTypes.Array,
    // require: true,
  },
  create_at: {
    type: Number,
    default: currentDate,
  },
  categories:{
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
},{versionKey: false });
const ShoppingCartModel = mongoose.model("shopping_cart", ShoppingCart);
export default ShoppingCartModel;
