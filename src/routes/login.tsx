import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Masuk — Pajak Pintar UMKM" }] }),
});

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.9 35.4 44 30 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12a12 12 0 1 0-13.9 11.9V15.5H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3H15.9c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z"/>
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setUser({ id: crypto.randomUUID(), name: email.split("@")[0].toUpperCase(), email, provider: "email" });
    navigate({ to: "/dashboard" });
  };

  const oauth = (provider: "google" | "facebook") => {
    setUser({
      id: crypto.randomUUID(),
      name: provider === "google" ? "GOOGLE USER" : "FACEBOOK USER",
      email: `demo@${provider}.com`,
      provider,
    });
    navigate({ to: "/dashboard" });
  };

  return (
    <AuroraBackground>
      <div className="min-h-screen grid lg:grid-cols-2 items-center px-6 lg:px-16 py-12 gap-8">
        <div className="text-white max-w-xl">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-4 tracking-tight">Selamat Datang!</h1>
          <p className="text-lg lg:text-xl text-white/80">
            Kelola pajak UMKM Anda jadi lebih mudah dan praktis.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 lg:p-10 w-full max-w-md mx-auto lg:ml-auto shadow-glass">
          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/30 placeholder-white/80 text-white border-0 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/30 placeholder-white/80 text-white border-0 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-primary font-semibold py-4 rounded-2xl hover:bg-white/90 transition shadow-md"
            >
              Sign In
            </button>

            <a href="#" className="block text-white/90 text-sm underline">Lupa Password?</a>

            <div className="flex items-center gap-3 text-white/70 text-xs my-2">
              <div className="flex-1 h-px bg-white/30" />
              ATAU
              <div className="flex-1 h-px bg-white/30" />
            </div>

            <button
              type="button"
              onClick={() => oauth("google")}
              className="w-full flex items-center justify-center gap-3 bg-white text-foreground font-semibold py-3.5 rounded-2xl hover:bg-white/90"
            >
              <GoogleIcon /> Google
            </button>

            <button
              type="button"
              onClick={() => oauth("facebook")}
              className="w-full flex items-center justify-center gap-3 bg-white text-foreground font-semibold py-3.5 rounded-2xl hover:bg-white/90"
            >
              <FacebookIcon /> Facebook
            </button>

            <p className="text-center text-white/90 text-sm pt-2">
              Belum punya akun?{" "}
              <Link to="/register" className="font-bold underline">Daftar</Link>
            </p>
          </form>
        </div>
      </div>
    </AuroraBackground>
  );
}
