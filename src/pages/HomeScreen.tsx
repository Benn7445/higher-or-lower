import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { getTwoRandomMemes } from "../utils/MemeAPI";

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
    <View>
      {memes.map((meme, count) => {
        return (
          <Image
            key={"meme-" + count}
            source={{ uri: meme.url }}
            style={{ width: "100%", height: "50%" }}
            resizeMode="cover"
          />
        );
      })}
    </View>
  );
};

export default HomeScreen;
