import { Navbar } from "../components/landing/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
