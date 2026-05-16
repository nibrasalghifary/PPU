// Simple client-side mock auth using localStorage.
// Replace with real provider (Lovable Cloud / Supabase) when ready.

export type User = { id: string; name: string; email: string; provider: string };

const KEY = "ppumkm_user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}

export function setUser(u: User) {
  localStorage.setItem(KEY, JSON.stringify(u));
  window.dispatchEvent(new Event("auth-change"));
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("auth-change"));
}

import { useEffect, useState } from "react";
export function useAuth() {
  const [user, setU] = useState<User | null>(null);
  useEffect(() => {
    setU(getUser());
    const h = () => setU(getUser());
    window.addEventListener("auth-change", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("auth-change", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}
