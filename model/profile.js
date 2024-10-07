import mongoose from "mongoose";
let Schema = mongoose.Schema;

// const benefitSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   cv: { type: String, required: true },
// });

const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imageName: { type: String, required: true },
    cv: { type: String, required: true },
    cvName: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let profile;

if (mongoose.models.profile) {
  profile = mongoose.model("profile");
} else {
  profile = mongoose.model("profile", profileSchema);
}

export default profile;
