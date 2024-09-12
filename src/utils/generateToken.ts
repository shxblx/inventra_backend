import jwt from "jsonwebtoken";
import GenerateTokenParams from "../interface/Iutils/IgenerateToken";

export const generateToken = async ({
  userId,
  role,
}: GenerateTokenParams): Promise<string> => {
  const SECRETKEY = process.env.JWT_SECRET_KEY;

  if (SECRETKEY) {
    const token = jwt.sign({ userId, role }, SECRETKEY, {
      expiresIn: "30d",
    });
    return token;
  }

  throw new Error("JWT key is not defined!");
};
