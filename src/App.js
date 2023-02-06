import { useEffect, useState } from "react";
import riddles from './riddles.json';
import "./App.css";


import "./Fonts/Nunito-Black.ttf"
import "./Fonts/Nunito-Regular.ttf"
import "./Fonts/Nunito-Medium.ttf"
import "./Fonts/Nunito-Bold.ttf"


function App() {
  const [solution, setSolution] = useState('')
  const [guesses, setGuesses] = useState(Array(3).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver,  setIsGameOver] = useState(false);
  const [riddle, setRiddle] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().slice(0,10);
    const currentRiddle = riddles.find(riddle => riddle.DATE === today);
    setRiddle(currentRiddle);
    setSolution(currentRiddle.ANSWER.toLocaleLowerCase())
  }, [riddle.QUESTION]);

  function handleKeyboard (e) {
    handleType(e.key)
  }

  function guess () {
    const newGuesses = [...guesses]
      newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
      setGuesses(newGuesses)
      setCurrentGuess('')
      const isCorrect = solution === currentGuess
      if(isCorrect) {
         setIsGameOver(true);
      }
  }

  function handleType (event)  {

    let x = fetch('../netlify/functions/hello-world/hello-world.js')


    if(currentGuess.length === solution.length) {
      guess()
    } 
    
    if (event === 'Enter') {
      if(currentGuess.length  !== solution.length) {
        return
      } else {
        guess()
      } 
    }
    if(event === 'Backspace'){
      setCurrentGuess(currentGuess.slice(0, -1))
      return
    }
    const isLetter = event.match(/^[a-z]{1}$/)
    if(isLetter)
    {
      setCurrentGuess(oldGuess => oldGuess + event)
    }
    if(currentGuess.length !== solution.length) {
      return
    }
    if(currentGuess.length + 1  === solution.length - 1) {
      guess()
    }

  }


  useEffect(() => {
    if(isGameOver){
      return
    }
    window.addEventListener('keydown', handleKeyboard)
    if ('keydown') {return () => window.removeEventListener('keydown', handleKeyboard)}
  })

  return (
<div className="app"> 
    <Title />
    <section className="game"> 
        <div className="board">
          {guesses.map((guess, i) => {
            const isCurrentGuess =  i === guesses.findIndex(val => val == null)
              return (
                <Line 
                  guess={isCurrentGuess ? currentGuess : guess ?? ''}
                  isFinal={!isCurrentGuess && guess != null}
                  solution={solution}
                  currentGuess={currentGuess}
                  guesses={guesses}
                  row={i}
                  key={i}
                  />
              )
            })
          }
        </div>
      </section>
    <Riddle q={riddle.QUESTION}/>
    <Keyboard handleType={handleType}/>
</div>
  );
}

export default App;

function Line({guesses, row, guess, isFinal, solution, currentGuess}) {
  const tiles = []
  for (let i = 0; i < solution.length; i++) {
    const char = guess[i] 

    let className = `tile`
    


    if(isFinal) {
      if (char === solution[i]){
        className += ' correct'
      } else if (solution.includes(char)) {
        className += ' close shake'
      } else {
        className += ' incorrect shake'
      }
    }

    if (currentGuess.length === i && row === guesses.filter(entry => entry !== null).length) {
      className += ' flash'
    }

    tiles.push(<div className={className} row={row} col={i} key={i}> {char}</div>)
  }
  return (
    <div className="line" > {tiles}</div>
  )
} 



function Riddle({q}) {
  return (
    <h4> {q} </h4>
  )
}


function Title() {
  return (
    <h1> GRIDL</h1>
  )
}

function Keyboard({ handleType }) {

  const test = (e) => {
    const { value } = e.target
    handleType(value)
  }

  const rowOneKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const rowTwoKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const rowThreeKeys = ["z", "x", "c", "v", "b", "n", "m"];

  return (
    <div className="keyboard">
      <section className="rowOne">
        {rowOneKeys.map((value) => (
          <button className="key" key={value} value={value} id="key" onClick={test}>
            {value}
          </button>
        ))}
      </section>

      <section className="rowTwo">
        {rowTwoKeys.map((value) => (
          <button className="key" key={value} value={value} onClick={test}>
            {value}
          </button>
        ))}
      </section>

      <section className="rowThree">
      

        {rowThreeKeys.map((value) => (
          <button className="key" key={value} value={value} onClick={test}>
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
  );
}