import { createFileRoute } from "@tanstack/react-router";
import { AlarmClock, TrendingUp, Minus, BarChart3, User, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Pajak Pintar UMKM" }] }),
});

const tenggat = [
  { label: "Setoran PPN Q2 — 15 Hari Lagi", urgent: true },
  { label: "Penyampaian SPT — 30 Hari Lagi", urgent: false },
  { label: "Bukti Potong — Selesai", done: true },
];

const laporan = [
  { type: "Setoran PPN Q2", date: "20 Juli 2025", status: "Selesai" },
  { type: "Penyampaian SPT", date: "11 Agustus 2025", status: "Selesai" },
  { type: "Bukti Potong", date: "25 Oktober 2025", status: "Selesai" },
];

function Dashboard() {
  const user = useAuth();
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <section className="bg-card rounded-3xl p-6 shadow-card">
          <h3 className="flex items-center gap-2 font-bold text-lg mb-4">
            <AlarmClock className="text-primary" size={22} /> Tenggat Waktu
          </h3>
          <div className="space-y-3">
            {tenggat.map((t) => (
              <div
                key={t.label}
                className={`px-5 py-4 rounded-2xl text-sm font-medium ${
                  t.done
                    ? "bg-success/10 text-success line-through"
                    : t.urgent
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-foreground"
                }`}
              >
                {t.label}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-3xl p-6 shadow-card">
          <h3 className="font-bold text-lg mb-4">Laporan Terakhir</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="pb-3 font-semibold">Report Type</th>
                  <th className="pb-3 font-semibold">Tanggal</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {laporan.map((l) => (
                  <tr key={l.type} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{l.type}</td>
                    <td className="py-3 text-muted-foreground">{l.date}</td>
                    <td className="py-3"><span className="text-success font-semibold">{l.status}</span></td>
                    <td className="py-3"><ArrowRight size={18} className="text-primary" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="bg-card rounded-3xl p-6 shadow-card">
          <h3 className="font-bold text-lg mb-4">Ringkasan Keuangan</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground">Total Penerimaan</p>
                <p className="font-bold">Rp 25.000.000</p>
              </div>
              <TrendingUp className="text-success" size={20} />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground">Total Biaya</p>
                <p className="font-bold">Rp 10.000.000</p>
              </div>
              <Minus className="text-muted-foreground" size={20} />
            </div>
            <div className="flex justify-between items-start pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Sisa Kas</p>
                <p className="font-bold text-primary">Rp 15.000.000</p>
              </div>
              <BarChart3 className="text-primary" size={20} />
            </div>
          </div>
        </section>

        <section className="bg-card rounded-3xl p-6 shadow-card">
          <h3 className="font-bold text-lg mb-4">Informasi Pengguna</h3>
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-3">
              <User size={42} className="text-muted-foreground" />
            </div>
            <p className="font-bold text-lg">{user?.name ?? "TAMU"}</p>
            <p className="text-xs text-muted-foreground mb-3">ID: {user?.id?.slice(0, 8).toUpperCase() ?? "—"}</p>
            <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
              Edit Profil
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
