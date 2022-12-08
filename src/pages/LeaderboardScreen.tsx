import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { GetAsyncStorage, SetAsyncStorage } from "../utils/AsyncStorageHelper";

export const LeaderboardScreen = () => {
  const [name, setName] = useState<string | undefined>();
  const [nameField, setNameField] = useState<string>("");

  useEffect(() => {
    const asyncCall = async () => {
      setName(await GetAsyncStorage("name"));
    };
    asyncCall();
  }, []);

  return name ? (
    <ScrollView></ScrollView>
  ) : (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <Text style={{ color: "white", fontSize: 16 }}>
          What is your username?
        </Text>
        <TextInput
          style={{
            marginTop: 10,
            fontSize: 35,
            color: "#fff",
            fontWeight: "700",
            textAlign: "center"
          }}
          placeholderTextColor="#737373"
          placeholder="Username"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{ width: "100%", alignItems: "center" }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: nameField.length > 2 ? "white" : "#808080",
            width: "95%",
            paddingVertical: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          disabled={nameField.length <= 2}
          onPress={() => {
            SetAsyncStorage("name", nameField);
            setName(nameField);
          }}
        >
          <Text style={{ fontWeight: "700" }}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LeaderboardScreen;
