import mongoose from "mongoose";
import moment from "moment";
const CurrentDate = moment().unix();

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
  createAt: {
    type: Number,
    default: CurrentDate,
  },
  address: {
    type: String,
  },
  numPhone: {
    type: Number,
    required: true,
    minLength: 9,
    maxLength: 13,
  },
  // cart_id: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'carts'
  //   }
  // ],
});
const UserModel = mongoose.model("users", User);
export default UserModel;
