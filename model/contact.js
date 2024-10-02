import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const contactSchema = new Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, required: true },
    link: { type: String, required: true },
    phone: { type: String, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let contact;

if (mongoose.models.contact) {
  contact = mongoose.model("contact");
} else {
  contact = mongoose.model("contact", contactSchema);
}

export default contact;
