export const getStats = () => {
  const statsJSON = localStorage.getItem("stats");
  if (statsJSON !== null) {
    const savedStats = JSON.parse(statsJSON);

    const currentGameID = `${dayOfYear(new Date())}`;
    if (savedStats.lastGameID !== currentGameID) {
      savedStats.guesses = [];
      savedStats.lastGameID = currentGameID;
      savedStats.currentGuesses = 0;
      if (!savedStats.hasWon && !savedStats.hasLost) {
        savedStats.longestStreak =
          savedStats.currenStreak > savedStats.longestStreak
            ? savedStats.currenStreak
            : savedStats.longestStreak;
        savedStats.currenStreak = 0;
      }
      savedStats.hasWon = false;
      savedStats.hasLost = false;
    }
    return { ...savedStats };
  } else {
    const currentGameID = `${dayOfYear(new Date())}`;
    return {
      lastGameID: currentGameID,
      currentGuesses: 0,
      hasWon: false,
      hasLost: false,
      longestStreak: 0,
      currenStreak: 0,
      guesses: [],
    };
  }
};

const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
