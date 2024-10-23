import React from "react";

function Guesses({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess) => (
        <p className="guess" key={guess}>
          {guess}
        </p>
      ))}
    </div>
  );
}

export default Guesses;
