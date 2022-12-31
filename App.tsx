import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

import HomeScreen from "./src/pages/HomeScreen";
import Game from "./src/pages/Game";
import Leaderboard from "./src/pages/Leaderboard";
import { useState } from "react";

const Tab = createBottomTabNavigator();

export const App = () => {

  interface ScoreData {
    username: string;
    score: number;
  }

  const [scores, setScores] = useState<ScoreData[]>([]);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (active) => {
              return (
                <AntDesign
                  name="home"
                  color={active.focused ? "#008080" : "#808080"}
                  size={20}
                />
              );
            },
            tabBarActiveTintColor: "#008080",
            tabBarInactiveTintColor: "#808080",
            headerShown: false,
            tabBarStyle: { height: 0 }
          }}
        />
        <Tab.Screen
          name="Game"
          children={() => <Game scores={scores} setScores={setScores} />}
          options={{
            tabBarIcon: (active) => {
              return (
                <AntDesign
                  name="play"
                  color={active.focused ? "#008080" : "#808080"}
                  size={20}
                />
              );
            },
            tabBarActiveTintColor: "#008080",
            tabBarInactiveTintColor: "#808080"
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          children={() => <Leaderboard scores={scores} />}
          options={{
            tabBarIcon: (active) => {
              return (
                <AntDesign
                  name="play"
                  color={active.focused ? "#008080" : "#808080"}
                  size={20}
                />
              );
            },
            tabBarActiveTintColor: "#008080",
            tabBarInactiveTintColor: "#808080"
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
