import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const mySkillsSchema = new Schema(
  {
    title: { type: String, required: true },
    percentage: { type: Number, required: true },
    // benefit: [
    //   { type: benefitSchema, required: true }, // Array of benefit objects with specified structure
    // ],
  },
  { timestamps: true }
);

let mySkills;

if (mongoose.models.mySkills) {
  mySkills = mongoose.model("mySkills");
} else {
  mySkills = mongoose.model("mySkills", mySkillsSchema);
}

export default mySkills;