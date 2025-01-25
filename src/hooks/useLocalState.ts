import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const setInitialStateValue = <T>(key: string, initialValue: T) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Initialize state with initial value or from localStorage
  const [state, setState] = useState<T>(
    setInitialStateValue(key, initialValue)
  );

  // Sync state with localStorage
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) {
        setState(JSON.parse(e.newValue ?? ''));
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  // state setter that syncs with localStorage
  const onSetState: Dispatch<SetStateAction<T>> = (newStateOrFn) => {
    setState((prevState) => {
      const newState =
        typeof newStateOrFn === 'function'
          ? (newStateOrFn as (prev: T) => T)(prevState)
          : newStateOrFn;

      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    });
  };

  return [state, onSetState] as const;
};
