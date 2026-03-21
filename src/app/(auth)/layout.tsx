export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface/50 via-background to-background">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
