import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { GetMemes } from "../utils/MemeAPI";
import * as Haptics from "expo-haptics";

import AsyncStorage from "@react-native-async-storage/async-storage";
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

type GameProps = {
  scores: any;
  setScores: any;
}

const Game = (props: GameProps) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [lifes, setLifes] = useState(3);

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
      return setScore(score);
    }

    if (currentIndex < secondMemeIndex) {
      setScore(score + 1);
    } else {
      setLifes(lifes - 1);
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
      setScore(score + 1);
    } else {
      setLifes(lifes - 1);
    }
    if (secondMemeIndex > 98) {
      secondMemeIndex = 1;
    }
    setCurrentIndex(secondMemeIndex);
  };

  const currentMeme = memes[currentIndex];

  const secondMeme = memes[secondMemeIndex];

  const saveScore = async () => {
    const scoreData: ScoreData = {
      username: username,
      score: score,
    };
    props.setScores([...props.scores, scoreData]);
    try {
      await AsyncStorage.setItem("scores", JSON.stringify(props.scores));
    } catch (error) {
      console.error(error);
    }
    setUsername("");
    setScore(0);
  };

  useEffect(() => {
    const retrieveScores = async () => {
      try {
        const scoresString = await AsyncStorage.getItem("scores");
        if (scoresString) {
          props.setScores(JSON.parse(scoresString));
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveScores();
  }, []);

  const multiFuncLower = () => {
    handleLower();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const multiFuncHigher = () => {
    handleHigher();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const multiFuncScore = () => {
    if (username !== "") {
      saveScore();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      resetGame()
    }
  };
  
  const resetGame = () => {
    setLifes(3);
    setScore(0);
    setCurrentIndex(0);
  };

  return (
    <ScrollView>
      {lifes === 0 ? (
        <View style={styles.container}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor="#fff"
            style={{ color: "white", marginTop: 25 }}
          />
          <TouchableOpacity
            onPress={() => multiFuncScore()}
            style={{ backgroundColor: "gray", width: "95%", alignItems: "center", paddingVertical: 20, borderRadius: 10, marginTop: 20 }}
          >
            <Text style={{ color: "white" }}>Save Score</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => resetGame()}
            style={{ backgroundColor: "green", width: "95%", alignItems: "center", paddingVertical: 20, borderRadius: 10, marginTop: 20 }}
          >
            <Text style={{ color: "white" }}>Speel Opnieuw</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{ color: "white", marginTop: 15 }}>Score: {score}</Text>
          <Text style={{ color: "white", marginBottom: 25 }}>Lives: {lifes}</Text>

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
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  memeImage: {
    width: "80%",
    height: 250,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Game;
