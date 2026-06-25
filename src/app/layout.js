import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
// import Providers from "./providers";
import { Toaster } from "react-hot-toast";

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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,
    {
      cache: "no-store",
    }
  );

  const settings = await res.json();



  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* <Providers> */}
          <Toaster></Toaster>
          <Navbar settings={settings}/>
          <main className="flex-1">{children}</main>
          <Footer settings={settings}/>
        {/* </Providers> */}
      </body>
    </html>
  );
}