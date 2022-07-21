import React, { useState, useEffect, useReducer, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { isFunction } from 'lodash';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CharacterList from './CharacterList';
import CharacterView from './CharacterView';

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

const fetchData = (dispatch) => {
  dispatch({ type: LOADING });
  fetch(endpoint + '/characters')
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: FETCH_COMPLETE, payload: { response: res } });
    })
    .catch((error) => {
      dispatch({ type: FETCH_ERROR, payload: { error } });
    });
};

const useThunkReducer = (reducer, intialState) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const enhancedReducer = useCallback(
    (action) => {
      console.log(action);
      if (isFunction(action)) {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  return [state, enhancedReducer];
};

const Application = () => {
  const [state, dispatch] = useThunkReducer(fetchReducer, intialState);
  const characters = state.response ? state.response.characters : [];

  useEffect(() => {
    dispatch((dispatch) => {});
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchData)}>Fetch Characters</button>
          {state.loading ? (
            <p>Loading....</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {state.error && <p className="error">{state.error.message}</p>}
        </section>
        <section className="CharacterView">
          <Routes>
            <Route path="/characters/:id" element={<CharacterView />} />
          </Routes>
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
