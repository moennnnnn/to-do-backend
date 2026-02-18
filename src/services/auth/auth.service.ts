import Account from "@/models/auth/account.model";
import {
  AccountDocumentType,
  AccountFilterType,
  AccountType,
  SessionType,
} from "@/types/auth/account.type";

export const findAccountS = async (
  filter: AccountFilterType,
  selectFields?: string,
): Promise<AccountDocumentType | null> => {
  const account = await Account.findOne(filter)
    .select(selectFields || "")
    .exec();
  return account as AccountDocumentType | null;
};

export const registerS = async (data: AccountType) => {
  const account = await Account.create(data);
  return account;
};

export const pushSessionS = async (accountId: string, session: SessionType) => {
  return Account.findByIdAndUpdate(
    accountId,
    { $push: { sessions: session } },
    { new: true },
  );
};
