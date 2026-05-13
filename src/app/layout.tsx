import type { Metadata } from "next";
import "@fontsource/geist-sans";
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
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        {children}
      </body>
    </html>
  );
}
