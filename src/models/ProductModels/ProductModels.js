import mongoose, { SchemaType, SchemaTypes } from "mongoose";
import moment from 'moment';
const CurrentDate = moment().unix();
import { Categories } from "../../utils/Common.js";

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
  createAt: {
    type: Number,
    default: CurrentDate,
  },
  categories:{
    type: SchemaTypes.Number,
    require: true,
  },
  banner:{
    type: SchemaTypes.Array,
    require: true,
  },
  // isDeleted: { type: SchemaTypes.Boolean, default: false },
  // delete_date:{
  //   type: SchemaTypes.Number,
  //   default: null
  // },
  isDeleted: { type: Boolean, defaults: false },
  delete_date:{
    type: Number,
  },
  // cart_id: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'carts'
  //   }
  // ],
},{ versionKey: false });
const ProductModel = mongoose.model("product", Product);
export default ProductModel;
