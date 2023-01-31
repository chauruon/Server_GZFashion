import UserModel from "../../models/UserModels/UserModel.js";

export const RegisterUser = async (req, res) => {
  console.log('%s %s', req.url);

  console.log("🚀 ~ file: User.js:4 ~ RegisterUser ~ req", req)
  const post = req.body;
  const newPost = new UserModel(post)
  // try {
  //     await newPost.save();
  //     // if (!res.status(200)) {
  //     //   console.log(`RegisterUser error`);
  //     // }
  //     res.status(201).json(newPost);
  // } catch (e) {
  //   console.log("🚀 ~ file: User.js:7 ~ RegisterUser ~ error", e)
  //     res.status(409).json({message: e.message})
  // }
}