import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  emailValidated: { type: Boolean, default: false },
  password: { type: String, required: [true, "La contraseña es obligatoria"] },
  name: { type: String, required: [true, "El nombre es obligatorio"] },
  img: {
    type: String,
  },
  role: {
    type: [String],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
    default: "USER_ROLE",
  },
});

export const UserModel = mongoose.model("User", userSchema);
