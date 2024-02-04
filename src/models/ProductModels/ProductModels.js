import mongoose, { Schema, SchemaType, SchemaTypes } from "mongoose";
import moment from 'moment';
const currentDate = moment().unix();
import { TypeCategories } from "../../utils/Common.js";

const Product = mongoose.Schema({
  thumbnail: {
    type: SchemaTypes.Mixed,
    require: true,
  },
  title:{
    type: SchemaTypes.String,
    require: true,
    maxLength: 20,
  },
  decs:{
    type: SchemaTypes.String,
    require: true,
  },
  banner:{
    type: SchemaTypes.Array,
    require: true,
  },
  create_at: {
    type: Number,
    default: currentDate,
  },
  categories:{
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
},{ versionKey: false });
const ProductModel = mongoose.model("product", Product);
export default ProductModel;
