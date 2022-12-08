import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import HomeScreen from "./src/pages/HomeScreen";
import LeaderboardScreen from "./src/pages/LeaderboardScreen";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

export const App = () => {
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
                  name="Trophy"
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
          component={LeaderboardScreen}
          options={{
            tabBarIcon: (active) => {
              return (
                <AntDesign
                  name="Trophy"
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
