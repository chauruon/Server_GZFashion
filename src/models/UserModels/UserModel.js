import mongoose, { SchemaType, SchemaTypes } from "mongoose";
import moment from "moment";
const currentDate = moment().unix();

const User = mongoose.Schema({
  username: {
    type: SchemaTypes.String,
    require: true,
    trim: true,
  },
  password: {
    type: SchemaTypes.String,
    require: true,
  },
  name: {
    type: SchemaTypes.String,
    require: true,
    trim: true,
  },
  avatar: {
    type: SchemaTypes.String,
    default: "",
  },
  is_admin: {
    type: Boolean,
  },
  create_at: {
    type: SchemaTypes.Number,
    default: currentDate,
  },
  address: {
    type: SchemaTypes.String,
  },
  num_phone: {
    type: SchemaTypes.Number,
    required: true,
    minLength: 9,
    maxLength: 13,
  },
  is_deleted: {
    type: SchemaTypes.Boolean,
    default: false
  },
  delete_date:{
    type: SchemaTypes.Number,
    default: null
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
