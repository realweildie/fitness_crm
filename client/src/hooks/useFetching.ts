import { useState } from "react";

export const useFetching = (
  callback: Function
): [Function, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
