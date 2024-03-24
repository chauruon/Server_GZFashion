import mongoose,{SchemaTypes} from "mongoose";
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
    type: SchemaTypes.Boolean,
  },
  create_at: {
    type: SchemaTypes.Number,
    default: currentDate,
  },
  address: {
    type: SchemaTypes.String,
    required: true,
  },
  num_phone: {
    type: SchemaTypes.Number,
    required: true,
    minLength: 9,
    maxLength: 13,
  },
  uuid:{
    type: SchemaTypes.String,
  },
},{ versionKey: false });
const UserModel = mongoose.model("users", User);
export default UserModel;
