import { useState, useEffect, Dispatch, SetStateAction } from 'react';

//function to handle setting the initial state for the local storage
const setInitialStateValue = <T>(key: string, initialValue: T) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

export const useLocalState = <T>(key: string, initialValue: T) => {
  // Initialize state with initial value or from localStorage
  const [state, setState] = useState<T>(
    setInitialStateValue(key, initialValue)
  );

  // Sync state with localStorage and handle custom events
  useEffect(() => {
    const storageHandler = (e: StorageEvent) => {
      if (e.key === key) {
        setState(JSON.parse(e.newValue ?? ''));
      }
    };

    const customEventHandler = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setState(e.detail.value);
      }
    };

    // Listen for storage events (other tabs/windows)
    window.addEventListener('storage', storageHandler);
    // Listen for custom events (same window)
    window.addEventListener(
      `localState-${key}`,
      customEventHandler as EventListener
    );

    return () => {
      window.removeEventListener('storage', storageHandler);
      window.removeEventListener(
        `localState-${key}`,
        customEventHandler as EventListener
      );
    };
  }, [key]);

  // state setter that syncs with localStorage and dispatches custom event
  const onSetState: Dispatch<SetStateAction<T>> = (newStateOrFn) => {
    setState((prevState) => {
      const newState =
        typeof newStateOrFn === 'function'
          ? (newStateOrFn as (prev: T) => T)(prevState)
          : newStateOrFn;

      localStorage.setItem(key, JSON.stringify(newState));

      // Dispatch custom event for same-window updates
      window.dispatchEvent(
        new CustomEvent(`localState-${key}`, {
          detail: { key, value: newState },
        })
      );

      return newState;
    });
  };

  return [state, onSetState] as const;
};
