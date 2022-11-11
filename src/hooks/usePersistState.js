import { useState, useEffect } from 'react';

export function usePersistedState(
  key,
  initialState
) {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      try {
        return JSON.parse(storageValue);
      } catch (e) {
        return initialState;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}