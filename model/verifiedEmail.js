import mongoose from "mongoose";

const verifiedEmailSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Simple regex for email validation
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    message: {
      type: String,
      required: true,
    },
    // IsValidEmail: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.models.VerifiedEmail ||
  mongoose.model("VerifiedEmail", verifiedEmailSchema);
