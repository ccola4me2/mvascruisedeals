import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://mvascruisedeals.com"),
  title: {
    default: "MVAS Cruise Deals: Margaritaville at Sea Deals & Group Rates",
    template: "%s | MVAS Cruise Deals",
  },
  description:
    "MVAS Cruise Deals finds the best fares and group rates on Margaritaville at Sea cruises, from Bahamas getaways to week-long Caribbean sailings. Get a free quote.",
  keywords: [
    "Margaritaville at Sea deals",
    "Margaritaville at Sea group rates",
    "Margaritaville cruise deals",
    "Bahamas cruise from Palm Beach",
    "Tampa Caribbean cruise",
    "International Parrot Head Day Cruise",
    "MVAS Cruise Deals",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
