import React, { useState, memo } from 'react';
import { useGlobalContext } from './GrudgeContext';

const NewGrudge = () => {
  const [person, setPerson] = useState('');
  const [reason, setReason] = useState('');
  const { addGrudge } = useGlobalContext();
  const handleChange = (event) => {
    event.preventDefault();
    addGrudge({ person, reason });
  };
  console.log('Rendering the NewGrudge Component');
  return (
    <form className="NewGrudge" onSubmit={handleChange}>
      <input
        className="NewGrudge-input"
        placeholder="Person"
        type="text"
        value={person}
        onChange={(event) => setPerson(event.target.value)}
      />
      <input
        className="NewGrudge-input"
        placeholder="Reason"
        type="text"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
      />
      <input className="NewGrudge-submit button" type="submit" />
    </form>
  );
};

export default memo(NewGrudge);
