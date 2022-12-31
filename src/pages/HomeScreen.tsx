import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export const HomeScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [color,setColor] = useState("")
  const arr : string[] = ["blue", "red", "pink", "white", "black", "yellow", "green"]

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

  useEffect (() => {
    const randomColor = (arr : string[]) => {
      const random = Math.floor(Math.random() *  7 )
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
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
      }}
      onLayout={onLayoutRootView}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: "10%"}}>
        Welkom bij de Higher or Lower game
      </Text>
      <StatusBar 
        backgroundColor={color}
        />
      <Text
        style={{
          fontSize: 16,
          padding: "3%",
        }}
      >
        In dit spel krijgt u 2 memes te zien 1 boven de ander en daaronder 2
        knoppen. 1 genaamd "Higher" andere genaamd "Lower". {'\n'}{'\n'}U moet raden of de
        meme die van onder staat Hoger of Lager staat in de index
        ("populariteit") dan diegene erboven.{'\n'}{'\n'}Als u juist raad krijgt u een punt
        zo niet verliest u een leven. {'\n'}{'\n'}Het punt is om de hoogste score te behalen. U hebt 3 levens 
        eens dat uw levens op zijn eindigt het spel.
      </Text>
    </View>
  );
};
export default HomeScreen;
