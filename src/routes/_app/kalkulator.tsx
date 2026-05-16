import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator as CalcIcon, BarChart3, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_app/kalkulator")({
  component: Kalkulator,
  head: () => ({ meta: [{ title: "Kalkulator Pajak — Pajak Pintar UMKM" }] }),
});

const PTKP: Record<string, number> = {
  TK0: 54000000, K0: 58500000, K1: 63000000, K2: 67500000, K3: 72000000,
};

function calcPajak(bruto: number, status: string, pengurang: boolean) {
  const biayaJabatan = pengurang ? Math.min(bruto * 0.05, 500000) : 0;
  const netoTahunan = (bruto - biayaJabatan) * 12;
  const pkp = Math.max(0, netoTahunan - (PTKP[status] ?? PTKP.TK0));
  const tarif: [number, number][] = [
    [60000000, 0.05], [190000000, 0.15], [250000000, 0.25], [4500000000, 0.3], [Infinity, 0.35],
  ];
  let pajak = 0, sisa = pkp;
  for (const [batas, rate] of tarif) {
    const kena = Math.min(sisa, batas);
    pajak += kena * rate;
    sisa -= kena;
    if (sisa <= 0) break;
  }
  return Math.round(pajak / 12);
}

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

function Kalkulator() {
  const [status, setStatus] = useState("TK0");
  const [bruto, setBruto] = useState("1000000");
  const [pengurang, setPengurang] = useState(false);
  const [hasil, setHasil] = useState<number | null>(null);
  const brutoNum = parseInt(bruto.replace(/\D/g, "")) || 0;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="bg-card rounded-3xl p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <CalcIcon className="text-primary" size={24} />
          </div>
          <h3 className="font-bold text-xl">Input Data</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Status Perkawinan & Tanggungan</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-muted border-0 rounded-2xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="TK0">TK/0 — Tidak Kawin</option>
                <option value="K0">K/0 — Kawin</option>
                <option value="K1">K/1 — Kawin, 1 Tanggungan</option>
                <option value="K2">K/2 — Kawin, 2 Tanggungan</option>
                <option value="K3">K/3 — Kawin, 3 Tanggungan</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Penghasilan Bruto Bulan Ini (Rp)</label>
            <input
              type="text"
              value={`Rp ${brutoNum.toLocaleString("id-ID")}`}
              onChange={(e) => setBruto(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-muted border-0 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pengurang (Biaya Jabatan / Iuran)</label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={pengurang} onChange={(e) => setPengurang(e.target.checked)} />
              Sertakan biaya jabatan 5%
            </label>
          </div>

          <button
            onClick={() => setHasil(calcPajak(brutoNum, status, pengurang))}
            className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-2xl hover:opacity-90"
          >
            Hitung Pajak
          </button>
        </div>
      </section>

      <section className="bg-card rounded-3xl p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="text-primary" size={24} />
          </div>
          <h3 className="font-bold text-xl">Hasil Perhitungan</h3>
        </div>

        <p className="text-muted-foreground text-sm mb-2">Pajak Terhutang Bulan Ini</p>
        <p className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
          {hasil === null ? "Rp —" : fmt(hasil)}
        </p>

        {hasil !== null && (
          <div className="space-y-3 text-sm">
            <Row label="Status" value={status} />
            <Row label="Bruto / bulan" value={fmt(brutoNum)} />
            <Row label="Biaya jabatan" value={pengurang ? "Termasuk (5%)" : "Tidak"} />
            <Row label="Estimasi setahun" value={fmt(hasil * 12)} />
          </div>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
