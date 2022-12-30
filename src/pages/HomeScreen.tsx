import { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { getTwoRandomMemes } from "../utils/MemeAPI";
import { Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    fontSize: 20,
    color: "white",
  },
});

export const HomeScreen = () => {
  const [memes, setMemes] = useState<any[]>([]);

  useEffect(() => {
    const asyncCall = async () => {
      const memes = await getTwoRandomMemes();
      setMemes(memes);
    };
    asyncCall();
  }, []);

  return (
    <View style={styles.container}>
      {memes.map((meme, count) => {
        return (
          <View style={styles.image}>
            <View style={styles.circle}>
              <Text>VS</Text>
            </View>
            <Image
              key={"meme-" + count}
              source={{ uri: meme.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        );
      })}
    </View>
  );
};
export default HomeScreen;
