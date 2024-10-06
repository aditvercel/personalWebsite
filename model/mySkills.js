import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const mySkillsSchema = new Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    percentage: { type: Number, required: true },
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
