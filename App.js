import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Components/Header';
import GameScreen from './Screen/GameScreen';
import StartGameScreen from './Screen/StratGameScreen';
import GameOverScreen from './Screen/GameOverScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRound(0);
  };

  const configNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  };

  const GameOverHandler = numberOfRounds => {
    setGuessRound(numberOfRounds);
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen
        rounds={guessRound}
        userChoice={userNumber}
        onRestart={configNewGameHandler}
      />
    );
  }
  return (
    <>
      <View style={styles.Screen}>
        <Header title="Guess A Number" />
        {content}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
  },
});

export default App;
