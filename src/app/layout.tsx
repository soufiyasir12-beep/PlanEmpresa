import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Solutions & Automation S.L.",
  description: "Democratizando la IA para PYMEs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#0B0F19] text-white">
        {children}
      </body>
    </html>
  );
}
