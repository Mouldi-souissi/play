import { useEffect, useRef } from "react";

export const useDidUpdate = (callback, dependencies) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      console.log("first load");
      isInitialMount.current = false;
    } else {
      console.log("update");
      callback();
    }
  }, dependencies);
};
