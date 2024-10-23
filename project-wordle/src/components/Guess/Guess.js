import React from "react";
import { range } from "../../utils";
import { WORD_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers";

function Guess({ word, answer }) {
  const result = React.useMemo(() => checkGuess(word, answer), [word, answer]);

  if (word === undefined) {
    return (
      <p className="guess">
        {range(0, WORD_LENGTH).map((index) => (
          <span key={index} className="cell" />
        ))}
      </p>
    );
  }

  const letters = word.split("");

  return (
    <p className="guess">
      {letters.map((letter, index) => {
        const status = result.find(
          (resultLetter) => resultLetter.letter === letter
        ).status;

        return (
          <span key={`${letter}-${index}`} className={`cell ${status}`}>
            {letter}
          </span>
        );
      })}
    </p>
  );
}

export default Guess;
