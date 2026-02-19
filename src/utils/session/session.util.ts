import { SessionType } from "@/types/auth/account.type";
import { hashValue } from "@/utils/bcrypt/bcrypt.util";

export const buildSession = async (
  refreshTokenRaw: string,
  sid: string,
): Promise<SessionType> => {
  return {
    sid,
    token: await hashValue(refreshTokenRaw),
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  };
};
