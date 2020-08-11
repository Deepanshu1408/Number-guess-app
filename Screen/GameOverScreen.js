import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import Colors from '../Constants/Colors';
const GameOverScreen = props => {
  return (
    <>
      <View style={styles.Screen}>
        <Text>The Game is Over</Text>
        <View style={styles.ImageCont}>
          <Image
            style={styles.Image}
            source={require('../Assets/Success.png')}
          />
        </View>
        <Text style={{padding: 16, textAlign: 'center'}}>
          Your phone needed{' '}
          <Text style={styles.highlight}> {props.rounds}</Text> rounds to guess
          the number <Text style={styles.highlight}>{props.userChoice}</Text>
        </Text>
        <Button title="New Game" onPress={props.onRestart} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  ImageCont: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    marginVertical: 10,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
  },
  highlight: {
    color: Colors.primaryColor,
  },
});

export default GameOverScreen;
