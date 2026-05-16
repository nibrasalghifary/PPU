import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Search, Upload, FileText, Trash2, Download } from "lucide-react";

export const Route = createFileRoute("/_app/dokumen")({
  component: Dokumen,
  head: () => ({ meta: [{ title: "Dokumen Saya — Pajak Pintar UMKM" }] }),
});

type Doc = { id: string; name: string; date: string; type: string; status: string; data?: string };

const STORAGE_KEY = "ppumkm_docs";

function load(): Doc[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function Dokumen() {
  const [docs, setDocs] = useState<Doc[]>(load);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const save = (next: Doc[]) => {
    setDocs(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const added: Doc[] = files.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
      type: f.name.split(".").pop()?.toUpperCase() ?? "FILE",
      status: "Tersimpan",
    }));
    save([...added, ...docs]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (id: string) => save(docs.filter((d) => d.id !== id));
  const filtered = docs.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-2xl hover:opacity-90"
        >
          <Upload size={18} /> Unggah Dokumen Baru
        </button>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleUpload} />

        <div className="relative sm:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Something"
            className="w-full bg-muted rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-4 py-3 rounded-l-xl font-bold">No.</th>
              <th className="px-4 py-3 font-bold">Nama Dokumen</th>
              <th className="px-4 py-3 font-bold">Tanggal di Unggah</th>
              <th className="px-4 py-3 font-bold">Tipe</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 rounded-r-xl font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-muted-foreground py-12">Belum ada dokumen. Unggah dokumen pertama Anda.</td></tr>
            ) : filtered.map((d, i) => (
              <tr key={d.id} className="border-b border-border last:border-0">
                <td className="px-4 py-4">{i + 1}</td>
                <td className="px-4 py-4 font-medium flex items-center gap-2"><FileText size={16} className="text-primary" />{d.name}</td>
                <td className="px-4 py-4 text-muted-foreground">{d.date}</td>
                <td className="px-4 py-4">{d.type}</td>
                <td className="px-4 py-4"><span className="text-success font-semibold">{d.status}</span></td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-muted text-primary"><Download size={16} /></button>
                    <button onClick={() => remove(d.id)} className="p-2 rounded-lg hover:bg-muted text-destructive"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
