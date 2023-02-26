import { useEffect, useState } from "react";
import Header from "./Header/header";
import Footer from "./Header/footer";
import Wrong from "./modals/wrong";
import Correct from "./modals/correct";
import gaEvent from "./ga4";
import Keyboard from "./keyboard";
// import words from "./dict";

import riddles from "./riddles.json";
import "./App.css";

import "./Fonts/Nunito-Black.ttf";
import "./Fonts/Nunito-Regular.ttf";
import "./Fonts/Nunito-Medium.ttf";
import "./Fonts/Nunito-Bold.ttf";





function App() {
  const [solution, setSolution] = useState("h");
  const [guesses, setGuesses] = useState(localStorage.getItem("guesses") ? JSON.parse(localStorage.getItem("guesses")) : Array(3).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(localStorage.getItem("isGameOver") ? JSON.parse(localStorage.getItem("isGameOver")) : false);
  const [correct, setCorrect] = useState(localStorage.getItem("correct") ? JSON.parse(localStorage.getItem("correct")) : false);
  const [noGuessesLeft, setNoGuessesLeft] = useState(localStorage.getItem("noGuessesLeft") ? JSON.parse(localStorage.getItem("noGuessesLeft")) : false);
  const [riddle, setRiddle] = useState({});
  const [startTime, setStartTime] = useState(localStorage.getItem("startTime") || Date.now());
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

  const resetLocalStorage = () => {
      setGuesses(Array(3).fill(null))
      setIsGameOver(false)
      setCorrect(false)
      setNoGuessesLeft(false)
      setDatePlayed(new Date().toISOString().slice(0, 10))
      setStartTime(Date.now())
  }


  useEffect(() => {
    if (datePlayed !== new Date().toISOString().slice(0, 10)) {
      console.log("riddle != solution")
      resetLocalStorage()
    }
  })

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

  async function handleWin() {
    handleElapsedTime(); 
    await new Promise(resolve => setTimeout(resolve, 700));
    gaEvent("End_game", "Correct", solution)
    setIsGameOver(true);
    setCorrect(true);
  }

  useEffect(() => {
    if (guesses.filter((e) => e !== null).length === guesses.length && correct === null) {
      async function loss(){
        await new Promise(resolve => setTimeout(resolve, 700));
        setIsGameOver(true);
        setNoGuessesLeft(true);
        gaEvent("End_game", "Incorrect", solution)
      }
      loss()
    }
  }, [correct, guesses, solution])

  function guess() {
    const newGuesses = [...guesses];
    newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
    setGuesses(newGuesses);
    setCurrentGuess("");    
    const isCorrect = solution === currentGuess;
    if (isCorrect) {
      handleWin()
    }
  }



  function handleType(event) {
    
    if (guesses.filter((e) => e !== null).length === guesses.length) {
      setIsGameOver(true);
      setNoGuessesLeft(true);
      gaEvent("End_game", "Incorrect", solution)
    }

    if (event === "Enter") {
      if (currentGuess.length !== solution.length) {
        return;
      } else {
        // console.log(words[currentGuess.length],currentGuess, words[5].includes(currentGuess));

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
      <Header />
     
        <div className="play">
          <div>
            <Game guesses={guesses} currentGuess={currentGuess} solution={solution} />
            <Riddle q={riddle.QUESTION} />
          </div>
          <div >
          <Keyboard className="mw500" handleType={handleType} />
          </div>
        </div>
      {correct ? <Correct q={riddle.QUESTION}  elapsedTime={elapsedTime} guessesCount={guesses.filter((e) => e !== null).length} /> : null}
      {noGuessesLeft ? <Wrong  q={riddle.QUESTION}  a={riddle.ANSWER}/> : null}
      <Footer/>
    </div>
  );
}

export default App;
function Line({ className, guesses, row, guess, isFinal, solution, currentGuess }) {
  const tiles = [];
  for (let i = 0; i < solution.length; i++) {
    const char = guess[i];
    let className = `tile`;
    if (isFinal) {
      if(guess === solution){
        className += " correct glow";
      }
      else if (char === solution[i]) {
        setInterval(1000)
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
  return <div className={`line ` +  className} > {tiles}</div>;
}

function Riddle({ q }) {
  return (
    <div className="riddleContainer">
      <div className="riddle">
       <span className="riddleSpan"> {q} </span>
      </div>
    </div>
  );
}

function Game({ guesses, currentGuess, solution }) {
  return (
    <section className="game">
      <div className="board" id='board'>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Line className={"row"+i} guess={isCurrentGuess ? currentGuess : guess ?? ""} isFinal={!isCurrentGuess && guess != null} solution={solution} currentGuess={currentGuess} guesses={guesses} row={i} key={i} />
          );
        })}
      </div>
    </section>
  );
}
