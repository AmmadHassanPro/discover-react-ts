import React from 'react';
import { AnyAction, createStore, Dispatch } from 'redux';
import { Provider, connect } from 'react-redux';

const initialState = {
  counter: 0,
};
//action generators
const increment = () => ({
  type: 'INCREMENT',
});
//action generators
const decrement = () => ({
  type: 'DECREMENT',
});
//Action Generator with Payload
const add = (amount: number) => ({
  type: 'ADD',
  payload: {
    amount,
  },
});

//Reducer , the engine of our store

const reducer = (state = { counter: 0 }, action: AnyAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'ADD':
      return { ...state, counter: state.counter + action.payload.amount };
    default:
      return state;
  }
};
//Creating the store , giving it a reducer and initial State
const store = createStore(reducer, initialState);
// Done with redux store setup from above

//The props for below counter
interface CounterProps {
    value: number;
    increment: () => void;
    decrement: () => void;
  }

// Counter Component, presentational Component
function Counter({ value, increment, decrement }: CounterProps) {
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
          </div>
        </div>
      </div>
    );
  }


  const mapStateToProps = (state: {counter: number}) => ({
    value: state.counter,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  });

// Create a higher-order component ready to plug into a store
  const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

  //Use te HOC as a descendant of Provider
function ReduxCounter() {
  return (
    <Provider store={store}> {/* Provider is imported from react redux, it will provide the store to ConnectedCounter*/}
      <ConnectedCounter />
    </Provider>
  );
}



export default ReduxCounter;