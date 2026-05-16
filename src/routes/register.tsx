import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Daftar — Pajak Pintar UMKM" }] }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError("Lengkapi semua data.");
    if (form.password !== form.confirm) return setError("Password tidak cocok.");
    setUser({ id: crypto.randomUUID(), name: form.name.toUpperCase(), email: form.email, provider: "email" });
    navigate({ to: "/dashboard" });
  };

  return (
    <AuroraBackground>
      <div className="min-h-screen grid lg:grid-cols-2 items-center px-6 lg:px-16 py-12 gap-8">
        <div className="text-white max-w-xl">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-4 tracking-tight">Buat Akun Baru</h1>
          <p className="text-lg lg:text-xl text-white/80">
            Mulai kelola pajak UMKM Anda dalam hitungan menit.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 lg:p-10 w-full max-w-md mx-auto lg:ml-auto shadow-glass">
          <form onSubmit={submit} className="space-y-4">
            {(["name", "email", "password", "confirm"] as const).map((k) => (
              <input
                key={k}
                type={k.includes("password") || k === "confirm" ? "password" : k === "email" ? "email" : "text"}
                placeholder={
                  k === "name" ? "Nama Lengkap" : k === "email" ? "Email" : k === "password" ? "Password" : "Konfirmasi Password"
                }
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                className="w-full bg-white/30 placeholder-white/80 text-white border-0 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            ))}

            {error && <p className="text-red-200 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-white text-primary font-semibold py-4 rounded-2xl hover:bg-white/90 transition shadow-md"
            >
              Daftar Sekarang
            </button>

            <p className="text-center text-white/90 text-sm pt-2">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-bold underline">Masuk</Link>
            </p>
          </form>
        </div>
      </div>
    </AuroraBackground>
  );
}
