import React from 'react';
import Grudge from './Grudge';

const Grudges = ({ grudges = [], onForgive }) => {
  console.log("Rendering the Grudges Component");
  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map(grudge => (
        <Grudge key={grudge.id} grudge={grudge} onForgive={onForgive} />
      ))}
    </section>
  );
};

export default React.memo(Grudges);
