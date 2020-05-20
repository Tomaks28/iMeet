import { AsyncStorage } from "react-native";

export const getCacheData = async () => {
  const keys = await AsyncStorage.getAllKeys();
  //   const promise = [];
  //   for await (const key of keys) {
  //     promise.push({ item: key, value: await AsyncStorage.getItem(key) });
  //   }
  let cacheData: Array<string> = [];
  Promise.all(keys.map((key) => AsyncStorage.getItem(key))).then((values) => {
    // console.log(values);
    // cacheData.push(values);
    values.forEach((value) => {
      console.log(value);
      if (value) {
        cacheData.push(value);
      }
    });
    // if (values) {
    //   cacheData = values;
    // }
  });

  console.log(cacheData);

  return cacheData;
};
