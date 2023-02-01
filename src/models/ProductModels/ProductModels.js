import mongoose, { SchemaType, SchemaTypes } from "mongoose";
import moment from 'moment';
const CurrentDate = moment().unix();

const Product = mongoose.Schema({
  thumbnail: {
    type: SchemaTypes.String,
    require: true,
  },
  title:{
    type: SchemaTypes.String,
    require: true,
  },
  decs:{
    type: SchemaTypes.String,
    require: true,
  },
  banner:{
    type: SchemaTypes.Array,
    require: true,
  },
  createAt: {
    type: Number,
    default: CurrentDate,
  },
  // cart_id: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'carts'
  //   }
  // ],
});
const ProductModel = mongoose.model("product", Product);
export default ProductModel;
