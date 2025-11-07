"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/ui/textfield";
import { PasswordField } from "@/components/ui/password-field";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md p-8 rounded-xl w-full max-w-sm text-center">
        <div className="mb-6">
          <img src="/salingtau.png" alt="Logo" className="w-20 mx-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 mt-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
