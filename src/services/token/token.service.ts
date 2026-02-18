import Account from "@/models/auth/account.model";

export const pullExpiredSessionsS = async (accountId: string) => {
  return Account.updateOne(
    { _id: accountId },
    { $pull: { sessions: { expiresAt: { $lt: new Date() } } } },
  ).exec();
};
