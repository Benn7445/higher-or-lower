import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetAsyncStorage = async (
  storage: string
): Promise<string | undefined> => {
  try {
    const value = await AsyncStorage.getItem(storage);
    return value ? value : undefined;
  } catch (e) {
    return undefined;
  }
};

export const SetAsyncStorage = async (storage: string, item: string) => {
  try {
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem(storage, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
