import { createFileRoute } from "@tanstack/react-router";
import { Info, FileText, Users, Briefcase, ArrowRight, Check, X, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_app/laporan")({
  component: Laporan,
  head: () => ({ meta: [{ title: "Laporan SPT — Pajak Pintar UMKM" }] }),
});

function Laporan() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Persiapan SPT Tahunan</h1>
        <span className="text-xs italic bg-card border border-border px-4 py-2 rounded-full shadow-card">
          *Musim Pelaporan SPT Tahunan: Januari – Maret
        </span>
      </div>

      <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card space-y-6">
        <section className="bg-muted rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <Info className="text-primary mt-0.5" size={20} />
            <div>
              <p className="font-bold">Status Ringkas: Data Pembayaran Bulanan Terakumulasi</p>
              <p className="text-sm text-success font-semibold mt-1">✅ 12 dari 12 Bulan Terdata (Selesai)</p>
            </div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-aurora rounded-full" style={{ width: "100%" }} />
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-5">
          <Card
            icon={<FileText size={22} />}
            title="Penerimaan"
            subtitle="(Bukti Potong PPh 21)"
            statusIcon={<AlertTriangle className="text-destructive" size={16} />}
            status="Membutuhkan Verifikasi"
            statusClass="text-destructive"
            items={[
              { label: "Gaji Pokok", ok: true },
              { label: "Lembur", ok: true },
              { label: "Bonus", ok: false },
            ]}
            cta="Verifikasi Sekarang"
          />
          <Card
            icon={<Users size={22} />}
            title="Data Keluarga & Tanggungan"
            subtitle=""
            statusIcon={<Check className="text-success" size={16} />}
            status="Ready"
            statusClass="text-success"
            items={[
              { label: "Anak", ok: true },
              { label: "Istri", ok: true },
            ]}
            cta="Edit / Perbarui"
          />
          <Card
            icon={<Briefcase size={22} />}
            title="Harta & Kewajiban"
            subtitle=""
            statusIcon={<AlertTriangle className="text-destructive" size={16} />}
            status="Memerlukan Data Tambahan"
            statusClass="text-destructive"
            items={[
              { label: "Uang Tunai", ok: true },
              { label: "Tabungan", ok: false },
            ]}
            cta="Lengkapi Data"
          />
        </div>

        <p className="text-center text-sm italic font-semibold">
          *Pastikan semua data di atas sudah benar dan lengkap sebelum memulai persiapan formulir SPT.*
        </p>

        <div className="flex justify-center">
          <button className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-2xl text-lg shadow-glass hover:opacity-90">
            Mulai Persiapan SPT <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon, title, subtitle, statusIcon, status, statusClass, items, cta,
}: {
  icon: React.ReactNode; title: string; subtitle: string;
  statusIcon: React.ReactNode; status: string; statusClass: string;
  items: { label: string; ok: boolean }[]; cta: string;
}) {
  return (
    <div className="bg-muted rounded-2xl p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="text-primary">{icon}</div>
      </div>
      <div className={`flex items-center gap-1.5 text-sm font-semibold mb-3 ${statusClass}`}>
        {statusIcon} {status}
      </div>
      <ul className="text-sm space-y-1.5 mb-5 flex-1">
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-2">
            {i.ok ? <Check size={14} className="text-success" /> : <X size={14} className="text-destructive" />}
            {i.label}
          </li>
        ))}
      </ul>
      <button className="bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-xl hover:opacity-90">
        {cta}
      </button>
    </div>
  );
}
