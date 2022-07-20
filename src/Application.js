import React from 'react';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import { useGlobalContext } from './GrudgeContext';

const Application = () => {
  const { grudges, toggleForgiveness } = useGlobalContext();
  return (
    <div className="Application">
      <NewGrudge />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
