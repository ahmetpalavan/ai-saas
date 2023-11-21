import ModalProvider from "@/provider/modal-provider";
import ToasterProvider from "@/provider/toaster-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import CrispProvider from "@/provider/crisp-provider";

export const metadata: Metadata = {
  title: "Intelligent",
  description: "Ai Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ModalProvider />
          <ToasterProvider />
          <CrispProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
