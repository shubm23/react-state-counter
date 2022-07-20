import React, { useState, useEffect,useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import dummyData from './dummy-data';

import endpoint from './endpoint';

import './styles.scss';

const LOADING = 'LOADING';

const FETCH_COMPLETE = 'FETCH_COMPLETE';

const FETCH_ERROR = 'FETCH_ERROR';

const intialState = {
  response: null,
  loading: false,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      response: null,
      loading: true,
      error: null,
    };
  } else if (action.type === FETCH_COMPLETE) {
    return {
      response: action.payload.response,
      loading: false,
      error: null,
    };
  } else if (action.type === FETCH_ERROR) {
    return {
      response: null,
      loading: false,
      error: action.payload.error,
    };
  } else {
    return state;
  }
};

const useFetch = (url) => {
  const [{response,loading,error}, dispatch] = useReducer(fetchReducer, intialState);
  useEffect(() => {
    dispatch({ type: LOADING });
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: FETCH_COMPLETE, payload: { response: res } });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: { error } });
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
