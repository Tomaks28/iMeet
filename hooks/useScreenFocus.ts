import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useScreenFocus = (navigation: any) => {
  const [focus, setFocus] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = API.subscribe(userId, (focus) => setFocus(data));

      return () => unsubscribe();
    }, [userId])
  );

  // useEffect(() => {
  //   const handler = navigation.addListener("focus", () => {
  //     setFocus(true);
  //   });

  //   return () => {
  //     setFocus(false);
  //     handler;
  //   };
  // }, [navigation]);
  // return focus;
};

export default useScreenFocus;
