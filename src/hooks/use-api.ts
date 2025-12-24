import { useState, useEffect, useCallback } from "react";

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T = unknown>(
  url: string,
  options?: RequestInit
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  // Refetch function to manually trigger a new fetch
  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal,
        });

        // Check if response is ok
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const result: T = await response.json();

        // Only update state if component is still mounted
        if (!signal.aborted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!signal.aborted) {
          if (err instanceof Error) {
            if (err.name === "AbortError") {
              console.log("Fetch aborted");
            } else {
              setError(err.message);
            }
          } else {
            setError("An unknown error occurred");
          }
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to abort fetch if component unmounts
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchTrigger]); // Fetch on mount and when refetchTrigger changes

  return { data, loading, error, refetch };
}
