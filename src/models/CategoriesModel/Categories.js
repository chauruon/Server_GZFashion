import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const CurrentDate = moment().unix();

const Cate = mongoose.Schema({
  type:{
    type:SchemaTypes.Number,
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
    default: CurrentDate,
  },
},{ versionKey: false });
const CategoriesModel = mongoose.model("categories", Cate);
export default CategoriesModel;
