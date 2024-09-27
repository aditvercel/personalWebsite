import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    job_title: { type: String, required: true },
    message: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let testimonial;

if (mongoose.models.testimonial) {
  testimonial = mongoose.model("testimonial");
} else {
  testimonial = mongoose.model("testimonial", testimonialSchema);
}

export default testimonial;
