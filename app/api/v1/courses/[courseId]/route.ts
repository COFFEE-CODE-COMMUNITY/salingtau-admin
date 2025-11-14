import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/app/lib/jwt.utils";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8081";
const API_KEY = process.env.API_KEY || "";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Verifikasi authentication
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Token tidak valid atau sudah expired" },
        { status: 401 }
      );
    }

    const courseId = params.courseId;

    // Parse request body
    const body = await request.json();

    // Validasi body (harus ada status)
    if (!body.status) {
      return NextResponse.json(
        { error: "Status is required (published atau archived)" },
        { status: 400 }
      );
    }

    // Validasi nilai status
    if (!['published', 'archived'].includes(body.status)) {
      return NextResponse.json(
        { error: "Status harus 'published' atau 'archived'" },
        { status: 400 }
      );
    }

    const backendUrl = `${BACKEND_URL}/api/v1/courses/${courseId}`;

    // Forward request ke backend NestJS
    const response = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || "Gagal mengupdate course di backend",
          details: errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}