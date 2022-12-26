const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,

      minlength: 8,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superAdmin"],
    },
    username: {
    type:String,
    },
    status: {
      type: Boolean,
      default: 1,
    },
    token: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    phone: {
      type: String,
      trim: true,
    },
    otp: {
      type: String,
    },
    address: {
      shippingAddress: {
        pincode: {
          type: Number
        },
        building: {
          type: String,
        },
        area: {
          type: String,
        },
        landmark: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
      },
      billingAddress: {
        pincode: {
          type: Number,
        },
       building: {
          type: String,
        },
        area: {
          type: String,
        },
        landmark: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
      },
    },
    createdAt: { type: Date, default: Date.now(), index: { expiresIn: 300 } },
    source: { type: String },
  },
  {
    timestamps: true,
    collection: "smartveda",
  }
);
module.exports = mongoose.model("User", userSchema);
