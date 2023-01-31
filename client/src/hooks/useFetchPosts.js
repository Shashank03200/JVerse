import { func } from "joi";
import React, { useState, useEffect } from "react";
import routeInstance from "../api/routes.instance";

export default function useFetchPosts(pageNum = 1) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    const getPostsPage = async (pageNum = 1, signal = {}) => {
      const response = await routeInstance.get(
        `/api/posts/timeline?page=${pageNum}&count=2`,
        signal
      );

      const data = await response.data;
      return data.data;
    };

    getPostsPage(pageNum, signal)
      .then((data) => {
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: error.message });
      });

    return () => {
      return controller.abort();
    };
  }, [pageNum]);
  return { results, isLoading, isError, error, hasNextPage };
}
