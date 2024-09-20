import mongoose from "mongoose";
let Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: { type: String, required: true },
});

const packageServiceSchema = new Schema(
  {
    namaService: { type: String, required: true },
    hargaService: { type: Number, required: true },
    stock: { type: Number, required: true },
    title_1: { type: String, required: true },
    title_2: { type: String, required: false },
    deskripsi: { type: String, required: true },
    whatsappLink: { type: String, required: true },
    statusType: { type: String, required: true },
    benefit: [
      { type: benefitSchema, required: false }, // Array of benefit objects with specified structure
    ],
  },
  { timestamps: true }
);

let packageService;

if (mongoose.models.packageService) {
  packageService = mongoose.model("packageService");
} else {
  packageService = mongoose.model("packageService", packageServiceSchema);
}

export default packageService;
