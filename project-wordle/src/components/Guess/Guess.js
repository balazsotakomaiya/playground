import React from "react";
import { range } from "../../utils";
import { WORD_LENGTH } from "../../constants";

function Guess({ word }) {
  if (word === undefined) {
    return (
      <p className="guess">
        {range(0, WORD_LENGTH).map(() => (
          <span className="cell" />
        ))}
      </p>
    );
  }

  const letters = word.split("");

  return (
    <p className="guess">
      {letters.map((letter) => (
        <span className="cell">{letter}</span>
      ))}
    </p>
  );
}

export default Guess;
