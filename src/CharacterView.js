import React, { useState, useEffect } from 'react';
import endpoint from './endpoint';
import { useParams } from 'react-router-dom';

const CharacterView = () => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(endpoint + '/characters/' + id)
      .then((res) => res.json())
      .then((res) => {
        setCharacter(res.character);
      })
      .catch(console.error);
  }, [id]);

  return (
    <section className="CharacterView">
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birthYear}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eyeColor}
        </li>
        <li>
          <strong>Gender</strong>: {character.gender}
        </li>
        <li>
          <strong>Hair Color</strong>: {character.hairColor}
        </li>
        <li>
          <strong>Heigh</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>Skin Color</strong>: {character.skinColor}
        </li>
      </ul>
    </section>
  );
};

export default CharacterView;
