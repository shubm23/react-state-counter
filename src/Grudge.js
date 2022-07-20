import React from 'react';
import { useGlobalContext } from './GrudgeContext';

const Grudge = ({ grudge, onForgive }) => {
  const {toggleForgiveness} = useGlobalContext
  const forgive = () => toggleForgiveness(grudge.id);
  console.log("Rendering the Grudge Component");
  return (
    <article className="Grudge">
      <h3>{grudge.person}</h3>
      <p>{grudge.reason}</p>
      <div className="Grudge-controls">
        <label className="Grudge-forgiven">
          <input type="checkbox" checked={grudge.forgiven} onChange={forgive} />{' '}
          Forgiven
        </label>
      </div>
    </article>
  );
};

export default React.memo(Grudge);
