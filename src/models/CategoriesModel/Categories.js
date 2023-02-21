import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const CurrentDate = moment().unix();

const Cate = mongoose.Schema({
  categories: {
    type: SchemaTypes.Mixed,
    require: true,
  },
});
const CategoriesModel = mongoose.model("categories", Cate);
export default CategoriesModel;
