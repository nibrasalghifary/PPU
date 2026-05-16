import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Search, HelpCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/_app/bantuan")({
  component: Bantuan,
  head: () => ({ meta: [{ title: "Bantuan — Pajak Pintar UMKM" }] }),
});

const faqs = [
  { q: "Bagaimana cara mendaftar akun baru?", a: "Klik tombol 'Daftar' di halaman login, isi data Anda, lalu konfirmasi password. Anda juga bisa mendaftar cepat dengan Google atau Facebook." },
  { q: "Bagaimana cara menghitung pajak menggunakan Kalkulator?", a: "Buka menu Kalkulator, pilih status perkawinan, isi penghasilan bruto bulanan, centang biaya jabatan bila perlu, lalu klik 'Hitung Pajak'." },
  { q: "Bagaimana cara mengunggah dokumen?", a: "Masuk ke menu Dokumen Saya, klik 'Unggah Dokumen Baru', dan pilih file dari perangkat Anda. Dokumen akan tersimpan otomatis." },
  { q: "Apa fungsi halaman Laporan?", a: "Halaman Laporan membantu Anda menyiapkan SPT Tahunan dengan memverifikasi data penerimaan, keluarga, serta harta & kewajiban." },
  { q: "Bagaimana cara mendapatkan informasi terbaru tentang pajak?", a: "Kunjungi menu Informasi untuk membaca artikel terpilih dan mencari topik perpajakan yang Anda butuhkan." },
  { q: "Bagaimana cara keluar dari akun?", a: "Klik tombol 'Logout' di pojok kiri bawah sidebar." },
];

function Bantuan() {
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-aurora rounded-3xl p-8 lg:p-10 text-white shadow-glass">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold">Pusat Bantuan</h1>
        </div>
        <p className="text-white/80 mb-6">Pelajari cara menggunakan Pajak Pintar UMKM dengan panduan lengkap di bawah ini.</p>
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-full bg-white/20 placeholder-white/70 text-white rounded-full pl-12 pr-4 py-3 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/20"
          />
        </div>
      </div>

      <section className="bg-card rounded-3xl p-6 lg:p-8 shadow-card">
        <h2 className="font-bold text-xl mb-4">Pertanyaan yang Sering Diajukan</h2>
        <div className="space-y-3">
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/50"
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-6">Tidak ada hasil.</p>}
        </div>
      </section>

      <section className="bg-card rounded-3xl p-6 lg:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail className="text-primary" size={22} />
          </div>
          <div>
            <p className="font-bold">Masih butuh bantuan?</p>
            <p className="text-sm text-muted-foreground">Tim kami siap membantu Anda kapan saja.</p>
          </div>
        </div>
        <a href="mailto:support@pajakpintar.id" className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-2xl hover:opacity-90">
          Hubungi Support
        </a>
      </section>
    </div>
  );
}
