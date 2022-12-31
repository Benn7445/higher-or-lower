import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export const HomeScreen = ({ navigation }: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [color, setColor] = useState("")
  const arr: string[] = ["blue", "red", "pink", "white", "black", "yellow", "green"]

  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const randomColor = (arr: string[]) => {
      const random = Math.floor(Math.random() * 7)
      setColor(arr[random])
    }
    randomColor(arr);
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      onLayout={onLayoutRootView}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: "10%", color: "white" }}>
        Welkom bij de Higher or Lower game
      </Text>
      <StatusBar
        backgroundColor={color}
      />
      <Text
        style={{
          fontSize: 20,
          padding: "3%",
          color: "white"
        }}
      >
        In dit spel krijgt u 2 memes te zien 1 boven de ander en daaronder 2
        knoppen. 1 genaamd "Higher" andere genaamd "Lower". U moet raden of de
        meme die van onder staat Hoger of Lager staat in de index
        ("populariteit") dan diegene erboven. Als u juist raad krijgt u een punt
        Zo niet verliest u een leven.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Game")}
        style={{ backgroundColor: "green", width: "95%", alignItems: "center", paddingVertical: 20, borderRadius: 10, marginTop: 20 }}
      >
        <Text style={{ color: "white" }}>Volgende</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
