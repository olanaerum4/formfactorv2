import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FormFactor — AI Running Coach",
  description: "Adaptive training plans powered by real science",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
