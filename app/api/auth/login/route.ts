import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret-key-change-this";

export async function POST(request: NextRequest) {
  console.log("\n========================================");
  console.log("=== LOGIN REQUEST DEBUG ===");
  console.log("========================================");

  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password harus diisi" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findFirst({
      where: {
        username: username,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    console.log("✅ Step 1: Admin authenticated:", admin.username);
    console.log("✅ Step 2: JWT_SECRET defined:", !!JWT_SECRET);
    console.log("✅ Step 3: REFRESH_TOKEN_SECRET defined:", !!REFRESH_TOKEN_SECRET);

    // Generate access token (short lived)
    const accessToken = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("✅ Step 4: Access token generated");
    console.log("   - Length:", accessToken.length);
    console.log("   - First 30 chars:", accessToken.substring(0, 30) + "...");

    // Generate refresh token (long lived)
    const refreshToken = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Step 5: Refresh token generated");
    console.log("   - Length:", refreshToken.length);
    console.log("   - First 30 chars:", refreshToken.substring(0, 30) + "...");

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login berhasil",
        data: {
          admin: {
            id: admin.id,
            username: admin.username,
          },
        },
      },
      { status: 200 }
    );

    console.log("✅ Step 6: Response object created");

    // Set access token cookie
    console.log("⏳ Step 7: Setting accessToken cookie...");
    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    console.log("✅ Step 7: accessToken cookie set");

    // Set refresh token cookie
    console.log("⏳ Step 8: Setting refreshToken cookie...");
    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    console.log("✅ Step 8: refreshToken cookie set");

    // Verify cookies are in response
    const allCookies = response.cookies.getAll();
    console.log("✅ Step 9: Verifying cookies in response");
    console.log("   - Total cookies:", allCookies.length);

    allCookies.forEach((cookie, index) => {
      console.log(`   - Cookie ${index + 1}:`, {
        name: cookie.name,
        valueLength: cookie.value.length,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        maxAge: cookie.maxAge,
        sameSite: cookie.sameSite
      });
    });

    console.log("========================================");
    console.log("=== LOGIN SUCCESSFUL ===");
    console.log("========================================\n");

    return response;
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}