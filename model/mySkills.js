import mongoose from "mongoose";
let Schema = mongoose.Schema;


const mySkillsSchema = new Schema(
  {
    image: { type: String, required: true },
    imageName: { type: String, required: true },
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
