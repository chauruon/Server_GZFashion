import mongoose, { SchemaType, SchemaTypes } from "mongoose";
import moment from 'moment';
const CurrentDate = moment().unix();

const Menus = mongoose.Schema({
  menu: {
    type: SchemaTypes.Array,
    require: true,
  },
},{ versionKey: false });
const MenusModel = mongoose.model("menus", Menus);
export default MenusModel;
  