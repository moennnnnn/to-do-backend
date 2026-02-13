import { AccountDocumentType } from "@/types/auth/account.type";
import { model, Model, Schema } from "mongoose";

const AccountSchema = new Schema<AccountDocumentType>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const Account: Model<AccountDocumentType> = model<
  AccountDocumentType,
  Model<AccountDocumentType>
>("accounts", AccountSchema);

export default Account;
