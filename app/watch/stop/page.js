import StopWatch from "./StopWatch";

export const metadata = {
  title: "Stop watching a price",
  robots: { index: false, follow: false },
};

export default function StopWatchPage() {
  return (
    <section className="section">
      <div className="container sp-stop">
        <StopWatch />
      </div>
    </section>
  );
}
