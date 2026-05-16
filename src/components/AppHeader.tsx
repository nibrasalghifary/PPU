import { Search, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function AppHeader() {
  const user = useAuth();
  return (
    <header className="flex items-center gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search Something"
          className="w-full bg-card border border-border rounded-full pl-12 pr-4 py-3 text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-card">
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <User size={16} className="text-muted-foreground" />
        </div>
        <span className="font-bold text-sm uppercase tracking-wide">
          {user?.name ?? "Tamu"}
        </span>
      </div>
    </header>
  );
}
