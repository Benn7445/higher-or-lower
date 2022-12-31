import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import HomeScreen from "./src/pages/HomeScreen";
import Credits from "./src/pages/Credits";
import AntDesign from "react-native-vector-icons/AntDesign";

import Higher from "./src/pages/gamecode";

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
                  name="home"
                  color={active.focused ? "#008080" : "#808080"}
                  size={20}
                />
              );
            },
            tabBarActiveTintColor: "#008080",
            tabBarInactiveTintColor: "#808080",
          }}
        />

        <Tab.Screen
          name="Game"
          component={Higher}
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
            tabBarInactiveTintColor: "#808080",
          }}
        />
        <Tab.Screen
          name="Credits"
          component={Credits}
          options={{
            tabBarIcon: (active) => {
              return (
                <AntDesign
                  name="info"
                  color={active.focused ? "#008080" : "#808080"}
                  size={20}
                />
              );
            },
            tabBarActiveTintColor: "#008080",
            tabBarInactiveTintColor: "#808080",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
