import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

type LeaderboardProps = {
  scores: any;
}

const Leaderboard = (props: LeaderboardProps) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Leaderboard:</Text>
        <View style={styles.container}>
          <Text>Leaderboard:</Text>
          {props.scores.sort((o1: any, o2: any) => o1.score - o2.score).map((scoreData: any, count: number) => (
            <Text key={`score-${count}`} style={{ color: "white" }}>
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

export default Leaderboard;
