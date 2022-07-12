import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const ADD_GRUDGE = 'ADD_GRUDGE';

const ADD_FORGIVENESS = 'ADD_FORGIVENESS';

const reducer = (state, { type, payload }) => {
  if (type === ADD_GRUDGE) {
    return [...state, payload];
  } else if (type === ADD_FORGIVENESS) {
    const { id } = payload;
    return state.map((el) => {
      if (el.id !== id) return el;
      return { ...el, forgiven: !el.forgiven };
    });
  }
  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(({ person, reason }) => {
    dispatch({
      type: ADD_GRUDGE,
      payload: {
        id: id(),
        forgiven: false,
        person,
        reason,
      },
    });
  },[dispatch]);

  const toggleForgiveness = useCallback((id) => {
    dispatch({
      type: ADD_FORGIVENESS,
      payload: {
        id,
      },
    });
  },[dispatch]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
