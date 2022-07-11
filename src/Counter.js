import React, { useState, useEffect } from 'react';



/* Creating Custom Hook with LocalStorage */
const useLocalStorage = (intialState, key) => {
  const get = () =>
    JSON.parse(localStorage.getItem(key))
      ? JSON.parse(localStorage.getItem(key)).value
      : intialState;
  const [value, setValue] = useState(get());
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};



const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'countState');
  // const [resetVal, setResetVal] = useState(false);

  /* Will be Called whenever the count state changes */
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  /* Will be Called whenever the reset happens */
  // useEffect(() => {
  //   const timmer = setTimeout(() => {
  //     setResetVal(false);
  //   }, 10000);
  //   return () => {
  //     clearTimeout(timmer);
  //   };
  // }, [resetVal]);

  const increment = () => {
    setCount((c) => (c >= max ? c : c + step));
    console.log('Before', count);
  };

  const decrement = () => {
    setCount((c) => (c > 0 ? c - 1 : c));
  };

  const reset = () => {
    // setResetVal(true);
    setCount(0);
  };

  // if (resetVal)
  //   return (
  //     <div style={{ display: 'flex', alignItems: 'center' }}>
  //       Resetting the value ....
  //     </div>
  //   );
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
