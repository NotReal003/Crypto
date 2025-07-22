// app/layout.tsx
import '../styles/globals.css'
import { ReactNode } from "react";

export const metadata = {
  title: "RMP Product Store",
  description: "Buy and track your RMP licenses securely via crypto.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}