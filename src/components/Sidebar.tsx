import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Calculator, Info, FolderOpen, FileBarChart, HelpCircle, LogOut } from "lucide-react";
import aurora from "@/assets/aurora.jpg";
import logo from "@/assets/logo.png";
import { logout } from "@/lib/auth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/kalkulator", label: "Kalkulator", icon: Calculator },
  { to: "/informasi", label: "Informasi", icon: Info },
  { to: "/dokumen", label: "Dokumen Saya", icon: FolderOpen },
  { to: "/laporan", label: "Laporan", icon: FileBarChart },
] as const;

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <aside
      className="hidden md:flex md:flex-col w-64 min-h-screen text-white relative"
      style={{ backgroundImage: `url(${aurora})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-aurora-deep/70 to-aurora-deep/90" />
      <div className="relative flex flex-col h-screen sticky top-0 p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white/95 rounded-2xl p-3 shadow-glass">
            <img src={logo} alt="Pajak Pintar UMKM" className="h-14 w-auto" />
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = path === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-white/95 text-primary shadow-glass"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 pt-4 border-t border-white/20">
          <Link
            to="/bantuan"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            <HelpCircle size={18} /> Bantuan
          </Link>
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
