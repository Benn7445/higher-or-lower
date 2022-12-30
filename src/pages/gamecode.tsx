import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { GetMemes } from "../utils/MemeAPI";
import { memoize } from "lodash";
import * as Haptics from 'expo-haptics';

// Define an interface for the data that is returned by the imgflip API
interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}
interface ScoreData {
  username: string;
  score: number;
}
const Higher = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");

  // add a state variable to store the scores and usernames
  const [scores, setScores] = useState<ScoreData[]>([]);

  useEffect(() => {
    const asyncCall = async () => {
      const memes = await GetMemes();
      setMemes(memes);
    };
    asyncCall();
  }, []);

  let secondMemeIndex = Math.floor(Math.random() * memes.length);

  const handleHigher = () => {
    if (currentIndex === secondMemeIndex - 1) {
      return;
    }

    if (currentIndex < secondMemeIndex) {
      // compare the current index to the next index instead of the id properties
      setScore(score + 1);
    }
    if (secondMemeIndex > 98) {
      secondMemeIndex = 1;
    }
    setCurrentIndex(secondMemeIndex);
  };

  const handleLower = () => {
    if (currentIndex === secondMemeIndex - 1) {
      return;
    }

    if (currentIndex > secondMemeIndex) {
      // compare the current index to the next index instead of the id properties
      setScore(score - 1);
    }
    if (secondMemeIndex > 98) {
      secondMemeIndex = 1;
    }
    setCurrentIndex(secondMemeIndex);
  };

  const currentMeme = memes[currentIndex];

  const secondMeme = memes[secondMemeIndex]; // add a reference to the second meme here

  const saveScore = () => {
    const scoreData: ScoreData = {
      username: username,
      score: score,
    };

    // add the score data to the scores state variable
    setScores([...scores, scoreData]);

    // reset the username and score
    setUsername("");
    setScore(0);
  };

  const multiFuncLower = () => {
    handleLower();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  const multiFuncHigher = () => {
    handleHigher();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  const multiFuncScore = ()=> {
    saveScore();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Score: {score}</Text>
        {currentMeme ? (
          <Image
            source={{ uri: currentMeme.url }}
            style={styles.memeImage}
            resizeMode="contain"
          />
        ) : (
          <Text>Loading memes...</Text>
        )}
        {secondMeme ? (
          <Image
            source={{ uri: secondMeme.url }}
            style={styles.memeImage}
            resizeMode="contain"
          />
        ) : null}
        <View style={styles.buttonContainer}>
          <Button title="Lower" onPress={multiFuncLower} />
          <Button title="Higher" onPress={multiFuncHigher} />
        </View>

        {/* add a text input and button for the user to input their username and save their score */}
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
        <Button title="Save Score" onPress={multiFuncScore} />

        {/* add a leaderboard to display the saved scores */}
        <View>
          <Text>Leaderboard:</Text>
          {scores.map((scoreData) => (
            <Text key={scoreData.username}>
              {scoreData.username}: {scoreData.score}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  memeImage: {
    width: "80%",
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default Higher;
