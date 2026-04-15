export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md px-4 lg:rounded-2xl lg:border lg:border-gold/10 lg:bg-surface/30 lg:px-10 lg:py-12 lg:shadow-2xl lg:backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
