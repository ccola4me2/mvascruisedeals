// Hand-painted wooden directional signpost, echoing the Margaritaville flyers.
// Pass an array of place names; signs alternate pointing left and right.
export default function Signpost({ signs = [] }) {
  return (
    <div
      className="signpost"
      role="img"
      aria-label={`Directional signpost pointing to ${signs.join(", ")}`}
    >
      <span className="signpost-cap" aria-hidden="true" />
      <div className="signpost-signs">
        {signs.map((label, i) => (
          <div
            key={label}
            className={`sign sign--${i % 2 === 0 ? "left" : "right"} sign--w${
              i % 3
            }`}
          >
            <span className="sign-text">{label}</span>
          </div>
        ))}
      </div>
      <span className="signpost-base" aria-hidden="true" />
    </div>
  );
}
