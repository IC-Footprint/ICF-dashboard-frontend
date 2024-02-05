import { useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<NodeJS.Timeout>();

  return (...args: any[]) => {
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  };
}
