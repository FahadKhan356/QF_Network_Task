import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    identifier: { 
      type: String, 
      required: true, 
      unique: true // email or phone
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const UserAuth = mongoose.model('UserAuth', userSchema);
export default UserAuth;
