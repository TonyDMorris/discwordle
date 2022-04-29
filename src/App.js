import React, { useState, useEffect } from "react";
import Header from "./components/header";
import styled from "styled-components";
import { getStats } from "./localstorage";
import QuoteCarosel from "./components/quoteCarosel";
import gameData from "./data/quotes.json";
import backgroud from "./pictures/discworld-banner.jpeg";
import Input from "./components/input";
import Result from "./components/result";
import Guesses from "./components/guesses";
function App() {
  const [stats, setStats] = useState({
    lastGameID: "1",
    currentGuesses: 0,
    guesses: [],
    hasWon: false,
    hasLost: false,
    longestStreak: 0,
    currenStreak: 0,
  });

  const gameOver = () => {
    if (stats.hasLost | stats.hasWon) {
      return true;
    }
    return false;
  };
  const currentGame = getBookById(stats.lastGameID, gameData.books);
  const quotes = gameData.quotes[currentGame].slice(
    0,
    stats.currentGuesses + 1
  );
  const difficulty = calculateTries(gameData.quotes[currentGame].length);
  const remainingTries = difficulty - stats.currentGuesses;

  useEffect(() => {
    const stats = getStats();
    setStats(stats);
    return;
  }, []);

  const handleAnswer = (input) => {
    const newStats = answer(input, stats, currentGame, difficulty);
    setStats(newStats);
  };
  return (
    <Wrap>
      <Wrapper>
        <Header />
        {!gameOver() && (
          <QuoteCarosel quotes={quotes} index={stats.currentGuesses} />
        )}
        {!gameOver() && (
          <h4>
            Difficulty:{" "}
            {calculateDifficulty(gameData.quotes[currentGame].length)}
            <br />
            Remaining tries: {remainingTries}
          </h4>
        )}
        {!gameOver() && (
          <Input books={gameData.books} handleAnswer={handleAnswer} />
        )}
        {gameOver() && (
          <Result
            hasLost={stats.hasLost}
            hasWon={stats.hasWon}
            book={currentGame}
            imgRef={gameData.images[currentGame]}
            guesses={stats.guesses}
          />
        )}
        <Guesses guesses={stats.guesses}></Guesses>
      </Wrapper>
    </Wrap>
  );
}

export default App;

const Wrapper = styled.div`
  background: linear-gradient(
    0deg,
    rgba(255, 0, 150, 0.3),
    rgba(16, 23, 42, 0.9)
  );
  color: white;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 100%;
  height: 100vh;
`;

const Wrap = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  margin: 0;
  height: 100vh;

  background-color: rgba(16, 23, 42, 0.9);
  background-image: url(${backgroud});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    background-size: 175%;
    background-position: top;
  }
`;

const answer = (guess, prevState, currentGame, difficulty) => {
  prevState.currentGuesses += 1;
  prevState.guesses.push(guess);
  if (guess.toLowerCase() === currentGame.toLowerCase()) {
    prevState.hasWon = true;
    prevState.currenStreak++;
    prevState.longestStreak =
      prevState.currenStreak > prevState.longestStreak
        ? prevState.currenStreak
        : prevState.longestStreak;
  } else if (prevState.currentGuesses >= difficulty) {
    prevState.hasLost = true;
    prevState.longestStreak =
      prevState.currenStreak > prevState.longestStreak
        ? prevState.currenStreak
        : prevState.longestStreak;
    prevState.currenStreak = 0;
  }
  localStorage.setItem("stats", JSON.stringify(prevState));
  return { ...prevState };
};

const getBookById = (id, books) => {
  const book = books[id % books.length];
  return book;
};

const calculateDifficulty = (numberOfQuotes) => {
  if (numberOfQuotes > 5) {
    return "⭐⭐";
  }
  if (numberOfQuotes > 3) {
    return "⭐⭐⭐";
  }

  return "⭐⭐⭐⭐⭐";
};

const calculateTries = (numberOfQuotes) => {
  let numberOfTries = 5;
  if (numberOfQuotes < 5) {
    numberOfTries = numberOfQuotes;
  }
  return numberOfTries;
};
