import DigestStop from "./DigestStop";

export const metadata = {
  title: "Manage the price-drop email",
  robots: { index: false, follow: false },
};

export default function DigestStopPage() {
  return (
    <section className="section">
      <div className="container sp-stop">
        <DigestStop />
      </div>
    </section>
  );
}
