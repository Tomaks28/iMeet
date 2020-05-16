import { useEffect, useState } from "react";

// custom hook
const useTimer = (delay: number = 500) => {
  // State and setters for debounced value
  const [isTimed, setIsTimed] = useState<boolean>(false);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setIsTimed(true);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or componentWillUnmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [delay]); // Only re-call effect if value or delay changes

  return isTimed;
};

export default useTimer;
