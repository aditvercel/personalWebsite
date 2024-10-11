import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let user;

if (mongoose.models.user) {
  user = mongoose.model("user");
} else {
  user = mongoose.model("user", userSchema);
}

export default user;
