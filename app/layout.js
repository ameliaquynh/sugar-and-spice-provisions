import { Playfair_Display, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sugar & Spice Provisions",
  description:
    "A mom-and-daughter home bakery. Fresh cookies, breads, and treats made to order for pickup or delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${nunitoSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso font-sans antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
