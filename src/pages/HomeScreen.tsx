import { View, Text } from "react-native";

export const HomeScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: "10%" }}>
        Welkom bij de Higher or Lower game
      </Text>
      <Text
        style={{
          fontSize: 20,
          padding: "3%",
        }}
      >
        In dit spel krijgt u 2 memes te zien 1 boven de ander en daaronder 2
        knoppen. 1 genaamd "Higher" andere genaamd "Lower". U moet raden of de
        meme die van onder staat Hoger of Lager staat in de index
        ("populariteit") dan diegene erboven. Als u juist raad krijgt u een punt
        Zo niet verliest u een leven.
      </Text>
    </View>
  );
};
export default HomeScreen;
