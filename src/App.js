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
  const [guesses, setGuesses] = useState(Array(3).fill(null));
  const [correctKey, setCorrectKey ] = useState([])
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [noGuessesLeft, setNoGuessesLeft] = useState(false);
  const [riddle, setRiddle] = useState({});
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleElapsedTime = () =>   {
      setElapsedTime((Date.now() - startTime) / 1000);
  }

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
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
      setCorrect(true)
      handleElapsedTime()
    }
  }
  function handleType(event) {
    if (guesses.filter(e => e !== null).length === guesses.length) {
      setIsGameOver(true);
      setNoGuessesLeft(true);
    }
    
    if (event === "Enter") {
      if (currentGuess.length !== solution.length) {
        return;
      } else {
        guess()
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
      {correct ? <Complete solution={solution} elapsedTime={elapsedTime} guesses={guesses} /> : null}
      {isGameOver ? null 
      : <div>  
      <Game correctKey={correctKey} setCorrectKey={setCorrectKey} guesses={guesses} currentGuess={currentGuess} solution={solution} /> 
      <Riddle q={riddle.QUESTION} />
      <Keyboard handleType={handleType} /> 
      </div>
      }
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
  return <h4> {q} </h4>;
}

function Game({ correctKey, guesses, currentGuess, solution, setCorrectKey }) {
  return (
    <section className="game">
      <div className="board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Line correctKey={correctKey} setCorrectKey={setCorrectKey} guess={isCurrentGuess ? currentGuess : guess ?? ""} isFinal={!isCurrentGuess && guess != null} solution={solution} currentGuess={currentGuess} guesses={guesses} row={i} key={i} />
          );
        })}
      </div>
    </section>
  );
}

function Title() {
  return <h1> RIDLr</h1>;
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
            {value}
          </button>
        ))}
      </section>

      <section className="rowTwo">
        {rowTwoKeys.map((value) => (
          <button className="key" key={value} value={value} id={value} onClick={test}>
            {value}
          </button>
        ))}
      </section>

      <section className="rowThree">
        {rowThreeKeys.map((value) => (
          <button className="key" key={value} value={value} id={value} onClick={test}>
            {value}
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

function Complete ({solution, elapsedTime, guesses}) {
  return (
    <section className="container">
        <h2> Correct!</h2>
        <h4> You got {solution.toUpperCase()} in {elapsedTime} seconds and {guesses.filter(e => e !== null).length} guesses</h4>
        <p className="center">Come back tomorrow for a new riddle... or share this with a mate or something...</p>
        <Share /> 
      </section>
  )
}

function Idiot() {
  return (
    <section className="container">
        <h2> Not today...</h2>
        <p className="center">Come back tomorrow for a new riddle. or share this with a mate or something...</p>
        <Share /> 
      </section>
  )
}