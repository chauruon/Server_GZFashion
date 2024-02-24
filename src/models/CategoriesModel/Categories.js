import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const currentDate = moment().unix();

const Cate = mongoose.Schema({
  type:{
    type:SchemaTypes.String,
    require: true,
  },
  title:{
    type:SchemaTypes.String,
    require: true,
  },
  icon:{
    type:SchemaTypes.String,
    // require: true,
  },
  create_at: {
    type: Number,
    default: currentDate,
  },
},{ versionKey: false });
const CategoriesModel = mongoose.model("categories", Cate);
export default CategoriesModel;
