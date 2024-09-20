import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const latestProjectSchema = new Schema(
  {
    image: { type: String, required: true },
    title_1: { type: String, required: true },
    description: { type: Number, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let latestProject;

if (mongoose.models.latestProject) {
  latestProject = mongoose.model("latestProject");
} else {
  latestProject = mongoose.model("latestProject", latestProjectSchema);
}

export default latestProject;
