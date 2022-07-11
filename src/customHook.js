import { useState, useEffect } from 'react';

/* Creating Custom Hook with LocalStorage */
export const useLocalStorage = (intialState, key) => {
  const get = () =>
    JSON.parse(localStorage.getItem(key))
      ? JSON.parse(localStorage.getItem(key)).value
      : intialState;
  const [value, setValue] = useState(get());
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value, key]);

  return [value, setValue];
};
