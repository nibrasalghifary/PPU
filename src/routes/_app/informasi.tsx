import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_app/informasi")({
  component: Informasi,
  head: () => ({ meta: [{ title: "Informasi Pajak — Pajak Pintar UMKM" }] }),
});

const artikel = [
  {
    emoji: "🎯",
    title: "Tips Hemat Pajak UMKM: Bahasa Ringan",
    excerpt: "Tips Hemat Pajak UMKM dengan bahasa ringan yang membantu menyederhanakan perpajakan dalam artikel...",
  },
  {
    emoji: "📅",
    title: "Jadwal Penting Pelaporan Pajak Bulan Ini",
    excerpt: "Jangan sampai terlewat! Cek jadwal lengkap batas waktu pelaporan dan pembayaran pajak bulan ini...",
  },
  {
    emoji: "👨‍💼",
    title: "Panduan PPh Pasal 21 untuk Karyawan Baru",
    excerpt: "Bingung cara hitung potongan pajak gaji karyawan? Simak panduan praktis perhitungan PPh Pasal 21...",
  },
];

function Informasi() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl lg:text-3xl font-bold leading-snug">
          Informasi Pajak: Tingkatkan Wawasan Perpajakan Anda<br />dengan Bahasa yang Ringan
        </h1>
      </header>

      <section>
        <h2 className="text-xl font-bold mb-4">Pilih Artikel Terpilih</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {artikel.map((a) => (
            <article key={a.title} className="bg-card rounded-3xl p-6 shadow-card hover:shadow-glass transition">
              <h3 className="font-bold text-lg mb-3 flex gap-2"><span>{a.emoji}</span><span>{a.title}</span></h3>
              <p className="text-sm text-muted-foreground mb-4">{a.excerpt}</p>
              <a href="#" className="text-primary font-semibold text-sm hover:underline">Baca Selengkapnya →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-3xl p-6 shadow-card">
        <h2 className="text-xl font-bold mb-4">Jelajahi Semua & Pencarian</h2>
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Cari topik dan perpajakan tertentu..."
            className="w-full bg-muted rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-2xl hover:opacity-90">
          Lihat Semua Artikel
        </button>
      </section>
    </div>
  );
}
