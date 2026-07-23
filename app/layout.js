import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://mvascruisedeals.com"),
  title: {
    default: "MVA Cruise Deals: Margaritaville at Sea Deals & Group Rates",
    template: "%s | MVA Cruise Deals",
  },
  description:
    "MVA Cruise Deals finds the best fares and group rates on Margaritaville at Sea cruises, from 2-night Bahamas getaways to week-long Caribbean sailings. Get a free quote.",
  keywords: [
    "Margaritaville at Sea deals",
    "Margaritaville at Sea group rates",
    "Margaritaville cruise deals",
    "Bahamas cruise from Palm Beach",
    "Tampa Caribbean cruise",
    "cruise group rates",
    "MVA Cruise Deals",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
