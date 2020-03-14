import React, { useState } from 'react';
import { AnyAction, createStore } from 'redux';
/*
     This functional components use useState hook , to updae the state of the component
     Also, this is one of the simplest implementations of the redux store 
*/




// Counter Component, presentational Component
function ReduxCounterLocalFunctional() {
  const [value , setValue] = useState(0);



  const initialState = {
    counter: 0,
  };
  //action generators
  const increment = () => (
    store.dispatch ({type: 'INCREMENT'})
  );
  //action generators
  const decrement = () => (store.dispatch({type: 'DECREMENT'}));
  //action generators
  const multiplyBy2 = () => (store.dispatch({type: 'MULTIPLYBY2'}));
  //Action Generator with Payload
  const add = (amount: number) => ({
    type: 'ADD',
    payload: {
      amount,
    },
  });
  
  //Reducer , the engine of our store
  
  const reducer = (state = {counter : 0 }, action: AnyAction) => {
    switch (action.type) {
      case 'INCREMENT':
        setValue( value + 1) ; return  {counter : value} ;
      case 'DECREMENT':
        setValue( value - 1) ; return {counter : value};
      case 'ADD':
        setValue( value + 1) ; return {counter : value} ;
      case 'MULTIPLYBY2':
        setValue( value * 2) ; return {counter : value};
      default:
        return {counter : value};
    }
  };
  //Creating the store , giving it a reducer and initial State
  const store = createStore(reducer, initialState);
  // Done with redux store setup from above
  

    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">Redux Counter</h2>
        </div>
        <div className="card-content">
          <p>
            Counter: <span>{value}</span>
          </p>
          <div className="buttons">
            <button className="button" onClick={decrement}>
              Decrement
            </button>
            <button className="button" onClick={increment}>
              Increment
            </button>
            <button className="button" onClick={multiplyBy2}>
              Multiply By 2
            </button>
          </div>
        </div>
      </div>
    );
  }


export default ReduxCounterLocalFunctional;