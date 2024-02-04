import mongoose from "mongoose";
import moment from "moment";
const currentDate = moment().unix();

const User = mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
  },
  create_at: {
    type: Number,
    default: currentDate,
  },
  address: {
    type: String,
  },
  num_phone: {
    type: Number,
    required: true,
    minLength: 9,
    maxLength: 13,
  },
  uuid:{
    type: String,
  },
  // cart_id: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'carts'
  //   }
  // ],
},{ versionKey: false });
const UserModel = mongoose.model("users", User);
export default UserModel;
