import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      lowercase: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      maxlength: 15,
      validate: {
        validator: (value) => {
          const phoneRegex = /^[0-9]+$/;
          return phoneRegex.test(value);
        },
        message: "Please enter a valid phone number",
      },
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      blog: {
        type: String,
        required: true,
      },
      addressDetails: {
        type: String,
      },
    },
    userType: {
        type: String,
        enum: ['admin', 'Viewer'],
        required: true,
      },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;