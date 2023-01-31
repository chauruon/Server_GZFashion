import mongoose from "mongoose";

const User = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  creator: String,
  password: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});
const UserModel = mongoose.model("User", User);
export default UserModel;
