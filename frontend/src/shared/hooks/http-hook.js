import { useCallback, useState, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatus] = useState(null);
  const [ok, setOk] = useState(false);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method,
          body,
          headers,
        });
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.error.message);
        }
        setOk(res.ok);
        setStatus(res.status);
        return resData;
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  return { isLoading, error, statusCode, sendRequest, clearError, setError };
};
