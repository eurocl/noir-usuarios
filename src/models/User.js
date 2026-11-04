import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },

}, {

  timestamps: true,

});

// Preserve legacy username-only accounts while protecting email registrations.
userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });

const User = mongoose.model(
  "User",
  userSchema
);

export default User;
