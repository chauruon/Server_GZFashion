import moment from "moment";
import mongoose, { Schema, SchemaTypes } from "mongoose";

// const currentDate = moment().unix();
export const unixTimeInMillis = moment().valueOf();



const CV = mongoose.Schema({
  file: {
    type: SchemaTypes.String,
    require: true,
    trim: true,
  },
  create_at: {
    type: SchemaTypes.Number,
    default: 0,
  },
  date: {type: SchemaTypes.String,}
},{ versionKey: false });
export const DownloadCVModel = mongoose.model("cvs", CV);
