import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const journeySchema = new Schema(
  {
    image: { type: String, required: true },
    imageName: { type: String, required: true },
    year: { type: Date, required: true },
    title_1: { type: String, required: true },
    description_1: { type: String, required: true },
    description_2: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let journey;

if (mongoose.models.journey) {
  journey = mongoose.model("journey");
} else {
  journey = mongoose.model("journey", journeySchema);
}

export default journey;
