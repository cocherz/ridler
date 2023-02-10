import { useEffect, useState } from "react";
import Share from "./share/share";

import riddles from "./riddles.json";
import "./App.css";

import "./Fonts/Nunito-Black.ttf";
import "./Fonts/Nunito-Regular.ttf";
import "./Fonts/Nunito-Medium.ttf";
import "./Fonts/Nunito-Bold.ttf";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(localStorage.getItem("guesses") ? JSON.parse(localStorage.getItem("guesses")) : Array(3).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(localStorage.getItem("isGameOver") ? JSON.parse(localStorage.getItem("isGameOver")) : false);
  const [correct, setCorrect] = useState(localStorage.getItem("correct") ? JSON.parse(localStorage.getItem("correct")) : false);
  const [noGuessesLeft, setNoGuessesLeft] = useState(localStorage.getItem("noGuessesLeft") ? JSON.parse(localStorage.getItem("noGuessesLeft")) : false);
  const [riddle, setRiddle] = useState({});
  const [startTime] = useState(localStorage.getItem("startTime") || Date.now());
  const [elapsedTime, setElapsedTime] = useState(localStorage.getItem("elapsedTime") || 0);
  const [datePlayed, setDatePlayed] = useState(localStorage.getItem("datePlayed") || new Date().toISOString().slice(0, 10));

  useEffect(() => {
    localStorage.setItem("guesses", JSON.stringify(guesses));
    localStorage.setItem("isGameOver", JSON.stringify(isGameOver));
    localStorage.setItem("correct", JSON.stringify(correct));
    localStorage.setItem("noGuessesLeft", JSON.stringify(noGuessesLeft));
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("elapsedTime", elapsedTime);
    localStorage.setItem("datePlayed", datePlayed);
  });

  useEffect(() => {
    if (datePlayed !== new Date().toISOString().slice(0, 10)) {
      console.log("riddle != solution");
      localStorage.clear();
      window.location.reload();
    }
  });

  const handleElapsedTime = () => {
    setElapsedTime((Date.now() - startTime) / 1000);
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setDatePlayed(today);
    const currentRiddle = riddles.find((riddle) => riddle.DATE === today);
    setRiddle(currentRiddle);
    setSolution(currentRiddle.ANSWER.toLocaleLowerCase());
  }, [riddle.QUESTION]);

  function handleKeyboard(e) {
    handleType(e.key);
  }

  function guess() {
    const newGuesses = [...guesses];
    newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
    setGuesses(newGuesses);
    setCurrentGuess("");
    const isCorrect = solution === currentGuess;
    if (isCorrect) {
      setIsGameOver(true);
      setCorrect(true);
      handleElapsedTime();
    }
  }
  function handleType(event) {
    if (guesses.filter((e) => e !== null).length === guesses.length) {
      setIsGameOver(true);
      setNoGuessesLeft(true);
    }

    if (event === "Enter") {
      if (currentGuess.length !== solution.length) {
        return;
      } else {
        guess();
      }
    }

    if (event === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    const isLetter = event.match(/^[a-z]{1}$/);
    if (isLetter) {
      setCurrentGuess((oldGuess) => oldGuess + event);
    }

    if (currentGuess.length === solution.length) {
      guess();
    }

    if (currentGuess.length !== solution.length) {
      return;
    }
  }

  useEffect(() => {
    if (isGameOver) {
      return;
    }
    window.addEventListener("keydown", handleKeyboard);
    if ("keydown") {
      return () => window.removeEventListener("keydown", handleKeyboard);
    }
  });

  return (
    <div className="app">
      <Title />
      {correct ? <Complete solution={solution} elapsedTime={elapsedTime} guessesCount={guesses.filter((e) => e !== null).length} /> : null}
      {isGameOver ? null : (
        <div className="play">
          <div>
            <Game guesses={guesses} currentGuess={currentGuess} solution={solution} />
            <Riddle q={riddle.QUESTION} />
          </div>
          <div>
          <Keyboard handleType={handleType} />
          </div>
        </div>
      )}
      {noGuessesLeft ? <Idiot /> : null}
    </div>
  );
}

export default App;

function Line({ guesses, row, guess, isFinal, solution, currentGuess }) {
  const tiles = [];
  for (let i = 0; i < solution.length; i++) {
    const char = guess[i];

    let className = `tile`;

    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close shake";
      } else {
        className += " incorrect shake";
      }
    }

    if (currentGuess.length === i && row === guesses.filter((entry) => entry !== null).length) {
      className += " flash";
    }

    tiles.push(
      <div className={className} row={row} col={i} key={i}>
        {" "}
        {char}
      </div>
    );
  }
  return <div className="line"> {tiles}</div>;
}

function Riddle({ q }) {
  return (
    <div className="riddle">
      <span> {q} </span>
    </div>
  );
}

function Game({ guesses, currentGuess, solution }) {
  return (
    <section className="game">
      <div className="board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Line guess={isCurrentGuess ? currentGuess : guess ?? ""} isFinal={!isCurrentGuess && guess != null} solution={solution} currentGuess={currentGuess} guesses={guesses} row={i} key={i} />
          );
        })}
      </div>
    </section>
  );
}

function Title() {
  return <h1> RIDLr.</h1>;
}

function Keyboard({ handleType }) {
  const test = (e) => {
    const { value } = e.target;
    handleType(value);
  };

  const rowOneKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const rowTwoKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const rowThreeKeys = ["z", "x", "c", "v", "b", "n", "m"];

  return (
    <div className="keyboardContainer">
      <div className="keyboard">
        <section className="rowOne">
          {rowOneKeys.map((value) => (
            <button className="key" key={value} value={value} id={value} onClick={test}>
              {value.toLocaleUpperCase()}
            </button>
          ))}
        </section>

        <section className="rowTwo">
          {rowTwoKeys.map((value) => (
            <button className="key" key={value} value={value} id={value} onClick={test}>
              {value.toLocaleUpperCase()}
            </button>
          ))}
        </section>

        <section className="rowThree">
          {rowThreeKeys.map((value) => (
            <button className="key" key={value} value={value} id={value} onClick={test}>
              {value.toLocaleUpperCase()}
            </button>
          ))}
        </section>
        <section className="rowFour">
          <button className="key bigBtn" key="Backspace" value="Backspace" onClick={test}>
            ❌
          </button>
          <button className="key bigBtn" key="enter" value="Enter" onClick={test}>
            ✅
          </button>
        </section>
      </div>
    </div>
  );
}

function Complete({ solution, elapsedTime, guessesCount }) {
  return (
    <section className="container">
      <h2> Correct!</h2>
      <h4>
        {" "}
        You got '{solution.toUpperCase()}' in {Math.round(elapsedTime * 10) / 10} seconds and {guessesCount} {guessesCount > 1 ? 'guesses' : 'guess!'}
      </h4>
      <p className="center">Come back tomorrow for a new riddle... or share this with a mate or something in the meantime...</p>
      <Share />
      <button onClick={() => localStorage.clear() + window.location.reload()}> Try again </button>
    </section>
  );
}

function Idiot() {
  return (
    <section className="container">
      <h2> Not today...</h2>
      <p className="center">Come back tomorrow for a new riddle. or share this with a mate or something...</p>
      <Share />
      <button onClick={() => localStorage.clear() + window.location.reload()}> Try again </button>
    </section>
  );
}
