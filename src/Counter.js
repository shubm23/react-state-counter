import React, { useState, useEffect } from 'react';
const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);
  const [resetVal, setResetVal] = useState(false);
  const [timmer, setTimmer] = useState(null);

  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, []);

  useEffect(() => {
    document.title = `Counter: ${count}`;
    if (resetVal) {
      const t = setTimeout(() => {
        setResetVal(false);
      }, 3000);
      return () => {
        clearTimeout(t);
      };
    }
  }, [count]);

  const increment = () => {
    setCount((c) => (c >= max ? c : c + step));
    console.log('Before', count);
  };

  const decrement = () => {
    setCount((c) => (c > 0 ? c - 1 : c));
  };

  const reset = () => {
    setResetVal(true);
    setCount(0);
  };

  if (resetVal) {
    return <div>Resetting the value ....</div>;
  } else {
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
  }
};

export default Counter;
