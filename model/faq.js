import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const faqSchema = new Schema(
  {
    title_1: { type: String, required: true },
    description: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let faq;

if (mongoose.models.faq) {
  faq = mongoose.model("faq");
} else {
  faq = mongoose.model("faq", faqSchema);
}

export default faq;
