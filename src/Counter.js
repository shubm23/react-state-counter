import React, { useEffect } from 'react';
import { useLocalStorage } from './customHook';

const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'countState');

  /* Will be Called whenever the count state changes */
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  const increment = () => {
    setCount((c) => (c >= max ? c : c + step));
    console.log('Before', count);
  };

  const decrement = () => {
    setCount((c) => (c > 0 ? c - 1 : c));
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
