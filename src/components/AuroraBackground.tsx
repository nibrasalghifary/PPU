import aurora from "@/assets/aurora.jpg";

export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-full bg-aurora-deep"
      style={{
        backgroundImage: `url(${aurora})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-aurora-deep/60 via-transparent to-aurora-mid/40" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
