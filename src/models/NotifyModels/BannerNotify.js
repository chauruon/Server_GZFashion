import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const CurrentDate = moment().unix();

const BannerNotify = mongoose.Schema({
  banner: {
    type: SchemaTypes.Array,
    require: true,
  },
},{ versionKey: false });
const BannerNotifyModel = mongoose.model("banner_notify", BannerNotify);
export default BannerNotifyModel;
