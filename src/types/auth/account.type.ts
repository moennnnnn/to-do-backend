import { Document } from "mongoose";

export type SessionType = {
  _id: string;
  sid: string;
  token: string;
  expiresAt: Date;
};

export type AccountType = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  agree: boolean;
  sessions: SessionType[];
};

export type AccountFilterType = Partial<AccountType>;

export type AccountDocumentType = AccountType & Document;
