import mongoose from "mongoose";
let Schema = mongoose.Schema;

// const benefitSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   cv: { type: String, required: true },
// });

const querySchema = new Schema(
  {
    top_title: { type: String, required: true },
    bottom_title: { type: String, required: true },
    link: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let query;

if (mongoose.models.query) {
  query = mongoose.model("query");
} else {
  query = mongoose.model("query", querySchema);
}

export default query;
