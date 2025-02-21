import { useEffect, useRef, useCallback } from 'react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';

export function useInfiniteScroll(
  { fetchNextPage, hasNextPage, isFetchingNextPage }: Pick<
    UseInfiniteQueryResult,
    'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage'
  >
) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "100px",
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  return loadMoreRef;
} 