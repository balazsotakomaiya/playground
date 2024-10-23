import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import Guesses from "../Guesses";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [status, setStatus] = React.useState("playing");

  const onGuess = (guess) => {
    if (status !== "playing") {
      return;
    }

    setGuesses([...guesses, guess]);

    if (guess === answer) {
      setStatus("won");
      return;
    }

    if (guesses.length === NUM_OF_GUESSES_ALLOWED - 1) {
      setStatus("lost");
    }
  };

  return (
    <div>
      <Guesses guesses={guesses} answer={answer} />
      {status === "playing" && <Input onSubmit={onGuess} />}

      {/* Could well create new components */}
      {status === "won" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guesses.length} guesses</strong>.
          </p>
        </div>
      )}
      {status === "lost" && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default Game;
