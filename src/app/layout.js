import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mrutunjay Yadav",
  description: "Here is what my page does ...",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col  h-screen">
          <div className="flex-grow flex-1 ">{children}</div>
        </main>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
