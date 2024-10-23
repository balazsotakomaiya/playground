import React from "react";

function Input({ onSubmit }) {
  const [word, setWord] = React.useState("");

  const handleChange = (e) => {
    setWord(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(word);
    onSubmit(word);
    setWord("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="guess-input-wrapper">
        <label htmlFor="guess-input">Enter guess</label>
        <input
          required={true}
          value={word}
          onChange={handleChange}
          id="guess-input"
          type="text"
          minLength={5} /// Doesn't work properly
          maxLength={5}
        />
      </form>
    </div>
  );
}

export default Input;
