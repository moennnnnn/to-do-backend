import { Document } from "mongoose";

export type AccountType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  agree: boolean;
};

export type AccountFilterType = Partial<AccountType>;

export type AccountDocumentType = AccountType & Document;
