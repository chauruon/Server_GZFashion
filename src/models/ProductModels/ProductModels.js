import mongoose, { SchemaType, SchemaTypes } from "mongoose";
import moment from 'moment';
const CurrentDate = moment().unix();
import { Categories } from "../../utils/Common.js";

const Product = mongoose.Schema({
  thumbnail: {
    type: SchemaTypes.Mixed,
    require: true,
  },
  price:{
    type: SchemaTypes.Number,
    require: true,
  },
  sale_off:{
    type: SchemaTypes.Number,
    // default: null, 
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
  create_at: {
    type: Number,
    default: CurrentDate,
  },
  category:{
    type: SchemaTypes.ObjectId,
    ref: 'menus',
    // require: true,
  },
  banner:{
    type: SchemaTypes.Array,
    require: true,
  },
  is_deleted: {
    type: SchemaTypes.Boolean,
    default: false
  },
  delete_date:{
    type: SchemaTypes.Number,
    default: null
  },
  view:{
    type: SchemaTypes.Number,
    default: 0
  },
  quantity_purchased:{
    type: SchemaTypes.Number,
    default: 0
  },
  star:{
    type: SchemaTypes.Number,
    default: 0
  },
  user_favorite:[
    {
      type: SchemaTypes.ObjectId,
      ref: 'users'
    }
  ],
  // cart_id: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'carts'
  //   }
  // ],
},{ versionKey: false });
const ProductModel = mongoose.model("product", Product);
export default ProductModel;
