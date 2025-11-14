import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export function verifyToken(request: NextRequest) {
  console.log("=== JWT Verification Debug ===");

  // 1. Check if cookie exists
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("1. Access Token exists:", !!accessToken);

  if (!accessToken) {
    console.log("❌ No access token found in cookies");
    console.log("Available cookies:", request.cookies.getAll());
    return null;
  }

  // 2. Check JWT_SECRET
  console.log("2. JWT_SECRET defined:", !!JWT_SECRET);
  console.log("3. JWT_SECRET value:", JWT_SECRET.substring(0, 10) + "...");

  try {
    // 3. Verify token
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    console.log("✅ Token verified successfully");
    console.log("4. Decoded payload:", decoded);
    return decoded;
  } catch (error) {
    console.error("❌ JWT Verification failed:");
    if (error instanceof jwt.TokenExpiredError) {
      console.error("- Token expired at:", error.expiredAt);
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error("- JWT Error:", error.message);
    } else {
      console.error("- Unknown error:", error);
    }
    return null;
  }
}