// Wraps each letter for the hover effect; letters are grouped per word so lines only break between words.
export default function SplitName({ text, className }) {
  return (
    <span className={className}>
      {text.split(/(\s+)/).map((part, wi) =>
        /^\s+$/.test(part) ? (
          <span key={wi} className="letter space">
            {" "}
          </span>
        ) : (
          <span key={wi} className="word">
            {part.split("").map((ch, i) => (
              <span key={i} className="letter">
                {ch}
              </span>
            ))}
          </span>
        )
      )}
    </span>
  );
}
