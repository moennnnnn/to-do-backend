import { model, Model, Schema } from "mongoose";

const OtpSchema = new Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Otp: Model<any> = model("otps", OtpSchema);
export default Otp;
