import mongoose, { Schema, SchemaTypes } from "mongoose";
import moment from "moment";
const CurrentDate = moment().unix();

const Ads = mongoose.Schema({
  banner: {
    type: SchemaTypes.Array,
    require: true,
  },
});
const AdsModel = mongoose.model("Ads", Ads);
export default AdsModel;
