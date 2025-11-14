import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/app/lib/jwt.utils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8081";
const API_KEY = process.env.API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    // Verifikasi authentication
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Token tidak valid atau sudah expired" },
        { status: 401 }
      );
    }

    // Ambil query parameters (jika ada)
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const backendUrl = `${BACKEND_URL}/api/v1/courses${queryString ? `?${queryString}` : ''}`;

    // Fetch data dari backend NestJS
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || "Gagal mengambil data courses dari backend",
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Get courses error:", error);
    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}