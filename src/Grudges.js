import React from 'react';
import Grudge from './Grudge';
import { useGlobalContext } from './GrudgeContext';

const Grudges = () => {
  console.log('Rendering the Grudges Component');
  const { grudges } = useGlobalContext();
  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map((grudge) => (
        <Grudge key={grudge.id} grudge={grudge} />
      ))}
    </section>
  );
};

export default React.memo(Grudges);
