import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "MVA Cruise Deals — Find & Book the Best Cruise Vacations",
    template: "%s | MVA Cruise Deals",
  },
  description:
    "MVA Cruise Deals helps you find and book the best cruise vacations to the Caribbean, Alaska, the Mediterranean, and beyond. Compare deals and save.",
  keywords: [
    "cruise deals",
    "cheap cruises",
    "Caribbean cruise",
    "Alaska cruise",
    "cruise vacation",
    "MVA Cruise Deals",
  ],
  // Invisible deploy marker used to verify the GitHub -> Cloudflare pipeline.
  other: {
    "deploy-check": "deploy-20260723T195425Z",
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
