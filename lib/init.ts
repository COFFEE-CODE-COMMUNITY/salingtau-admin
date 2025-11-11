// src/lib/bootstrap.ts
import { main } from "@/prisma/seed";

let initialized = false;

export async function init() {
  if (initialized) return;
  initialized = true;

  try {
    console.log("🚀 Running bootstrap...");
    await main();
    console.log("✅ Bootstrap selesai");
  } catch (err) {
    console.error("❌ Bootstrap gagal:", err);
  }
}
