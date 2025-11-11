import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key-change-this";

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token tidak ditemukan" },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      id: string;
      username: string;
    };

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        username: decoded.username,
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Token berhasil direfresh",
      },
      { status: 200 }
    );

    // Set new access token cookie
    response.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { error: "Token tidak valid atau sudah expired" },
      { status: 401 }
    );
  }
}
