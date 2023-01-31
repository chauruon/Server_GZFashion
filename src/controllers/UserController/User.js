import UserModel from "../../models/UserModels/UserModel";

export const RegisterUser = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new UserModel(post)
    try {
        await newPost.save();
        if (!res.status(200)) {
          console.log(`RegisterUser error`);
        }
        res.status(200).json(newPost);
    } catch (e) {
        res.status(409).json({message: e.message})
    }
  } catch (error) {
    console.log("🚀 ~ file: User.js:7 ~ RegisterUser ~ error", error)
  }
}