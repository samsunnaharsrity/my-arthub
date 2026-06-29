import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import { Toaster } from "react-hot-toast";
import { getSettings } from "@/lib/api/settings";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ArtHub",
  description: "Online Art Marketplace",
};

export default async function RootLayout({ children }) {


  const settings = await getSettings();



  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground ">
        <Providers>
          <Toaster></Toaster>
          <Navbar settings={settings}/>
          <main className="flex-1">
              {children}
          </main>
          <Footer settings={settings}/>
          </Providers>
      </body>
    </html>
  );
}