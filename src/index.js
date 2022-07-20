import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import dummyData from './dummy-data';

import endpoint from './endpoint';

import './styles.scss';


const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setResponse(null);
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return [response, loading, error];
};

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/characters');
  const characters = response ? response.characters : [];
  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading....</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
