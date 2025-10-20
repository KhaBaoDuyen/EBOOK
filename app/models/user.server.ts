import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: false },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  avatar:{type: String || null},
  gender:{type: String , enum: ["Nam", "Nữ", "Khác"], default:"Khác"},
  birthDate:{ type: String},
  description:{ type: String},
  otpCode: { type: String, default: null },
  otpExpires: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
  status: { type: Number, enum: [1, 0], default: 1 },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model("User", userSchema);
export default User;
