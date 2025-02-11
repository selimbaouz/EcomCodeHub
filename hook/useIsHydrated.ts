import { useState, useEffect } from "react";

/**
 * Custom Hook to check whether the component is hydrated on the client side.
 * @returns {boolean} Indicates whether the component is hydrated.
 */
export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
