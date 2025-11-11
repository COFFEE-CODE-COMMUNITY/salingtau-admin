import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export interface AuthUser {
  id: string;
  username: string;
}

export function verifyAccessToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const accessToken = request.cookies.get("accessToken")?.value;
  
  if (!accessToken) {
    return null;
  }

  return verifyAccessToken(accessToken);
}
