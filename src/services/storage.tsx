import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * Storage service
 *
 * utilizes AsyncStorage to store data locally
 */
export interface Storage {
  storeData: (key: string, value: any) => Promise<void>;
  getData: (key: string) => Promise<any>;
  removeData: (key: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export const storage: Storage = {
  storeData,
  getData,
  removeData,
  clearAll,
};
