import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../Components/Card';
import Colors from '../Constants/Colors';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';

const StartGameScreen = props => {
  const [enterValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chooseNumber = parseInt(enterValue);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Number has to be a number between 1 to 99.',
        [
          {
            text: 'ok',
            style: 'destructive',
            onPress: resetInputHandler,
          },
        ],
      );
    }
    setConfirmed(true);
    setSelectedNumber(chooseNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.outputCont}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="Start Game"
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.Screen}>
          <Text style={styles.title}>Start a New Game!</Text>
          <Card style={styles.InputContainer}>
            <Text>Select a number</Text>
            <Input
              style={styles.Input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enterValue}
            />
            <View style={styles.ButtonContainer}>
              <View style={styles.Buttons}>
                <Button
                  onPress={resetInputHandler}
                  color={Colors.accent}
                  title="Reset"
                />
              </View>
              <View style={styles.Buttons}>
                <Button
                  onPress={confirmInputHandler}
                  color={Colors.primaryColor}
                  title="Confirm"
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  InputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  Buttons: {width: 100},
  Input: {
    width: 50,
    height: 40,
    textAlign: 'center',
  },
  outputViewStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 5,
  },
  outputCont: {
    width: '80%',
    alignItems: 'center',
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
  },
});

export default StartGameScreen;
