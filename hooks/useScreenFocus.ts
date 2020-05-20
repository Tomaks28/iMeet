import React, { useState, useEffect } from "react";

const useScreenFocus = (navigation: any, store: any) => {
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    const handler = navigation.addListener("focus", () => {
      setFocus(true);
      console.log(store);
    });

    return () => {
      setFocus(false);
      handler;
    };
  }, [navigation]);
  return focus;
};

export default useScreenFocus;
