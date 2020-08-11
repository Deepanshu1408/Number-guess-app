import React, {useState, useRef, useEffect} from 'react';

import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rendNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rendNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rendNumber;
  }
};
const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice),
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userChoice, onGameOver} = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert('Don\t lie!', 'Can Cheat Yourself...', [
        {text: 'Sorry!', style: 'Cancel'},
      ]);
      return;
    } else {
      if (direction === 'lower') {
        currentHigh.current = currentGuess;
      } else {
        currentLow.current = currentGuess;
      }
      const NextNumber = generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        currentGuess,
      );
      setCurrentGuess(NextNumber);
      setRounds(curRounds => curRounds + 1);
    }
  };
  return (
    <>
      <View style={styles.Screen}>
        <Text>User Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.ButtonContainer}>
          <Button
            title="LOWER"
            onPress={nextGuessHandler.bind(this, 'lower')}
          />
          <Button
            title="GREATER"
            onPress={nextGuessHandler.bind(this, 'greater')}
          />
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
