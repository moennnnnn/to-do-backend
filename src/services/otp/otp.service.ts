import Otp from "@/models/otp/otp.model";
import { hashValue, compareHashed } from "@/utils/bcrypt/bcrypt.util";

export const createOtpS = async (email: string, code: string) => {
  await Otp.deleteMany({ email }); // remove old codes
  const hashed = await hashValue(code);
  return Otp.create({
    email,
    code: hashed,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  });
};

export const verifyOtpS = async (email: string, code: string) => {
  const otp = await Otp.findOne({ email, used: false });
  if (!otp) return false;
  if (new Date(otp.expiresAt) < new Date()) return false;
  const matches = await compareHashed(code, otp.code);
  if (!matches) return false;
  await Otp.updateOne({ _id: otp._id }, { used: true });
  return true;
};
