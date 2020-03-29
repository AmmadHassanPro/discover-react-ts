import React from 'react';
import { Reducer, AnyAction, createStore, Dispatch, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import reduceReducers from 'reduce-reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

/*
This code is a simple demonstration of , how two components can be using the same Redux store , 
using their own reducers , and sharing the same state. We have used reduce-reducers to take union 
of two reducers which acts on the same data.
However , the redux recommends that each Reducer should update only one slice of data of the state
and CombineReducers should be instead. It really depends on the use case.
*/



let initialState = {
  counter: 0,
};


//Reducer , the engine of our store

const opsReducer = (state = { counter: 0 }, action: AnyAction) => {
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


//Reset Reducer
// This reducer is for the reste counter
//This is just to demonstrate that each comonent can have its own version of reducer which can be combined to the Root Reducer
const resetReducer = (state ={counter:0 }, action : AnyAction) =>{
  switch(action.type){
    case 'RESET':      
      return {...state , counter: 0};
    default:
      return state;
  }
};

// Using the reduceReducers from the reduce-reducers library. Please note that these are not part of Redux, it is another library
// It takes Union of two reducers and return a new reducer 
// CombineReducer is a different approach , which actually belongs to Redux
const redReducer =  reduceReducers (initialState,opsReducer,resetReducer);
//@ts-ignore 
const store = createStore(redReducer,initialState,devToolsEnhancer());
// Done with redux store setup from above

//The props for below counter
interface CounterProps {
    value: number;
    increment: () => void;
    decrement: () => void;
  }

// Counter Component, presentational Component
function Counter({ value, increment, decrement  }: CounterProps) {

  console.log("Component Re-rendered");
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


  interface RestCounterProps {
    reset: () => void;
  }


  function CounterForReset({reset }: RestCounterProps) {

    console.log("Component Re-rendered");
      return (
        <div className="card">
          <div className="card-content">
            <div className="buttons">
                 <button className="button" onClick={reset}>
                Reset Counter
              </button>
            </div>
          </div>
        </div>
      );
    }

  // This function will be called any time the store is updated, mapStateToProps will be called. it will be supplied with the new state returned by the Reducer . So we are hanlding it by setting the value property to the new State
  //The return of the mapStateToProps determine whether the connected component will re-render
  const mapStateToProps = (state: {counter: number} ) => {
    console.log(state);
    return({
    value: state.counter, // The re-render will happen, by performing a shallow comparison of this value , Notice why were are calling it a prop? bcuz value is supplied at the component creation
    })
  };
  //The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props
  // in the Above example, value is returned in a plain object, after its returned , it will be merged aka included in the Counter Compoonents props, so when re-rednering the component, it will be provided to the componenet's props
  //E.G
  //function Counter({ value, increment, decrement }: CounterProps)  , notice that the Counter component is expecting a n object that also includes the value , so the returned value is merged into that
  

  // mapDispatchToProps is given the dispatch of the your store object. Basically, these are also merged with the Props provided to the components .
  // So the above return value and the properties in the below return object will be merged to form a prop. That prop will be provided to the component
  
  //Function Version
  /*
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    increment: () => dispatch({type: 'INCREMENT'}),
    decrement: () => dispatch({type: 'DECREMENT'}),
  });
  */

  //Object Version
  //bindActionCreators turns an object whose values are action creators, into an object with the same keys, 
  //but with every action creator wrapped into a dispatch call so they may be invoked directly.
 const mapDispatchToProps = {
  increment : () => ({type: 'INCREMENT'}),
  decrement : () =>({type: 'DECREMENT'})

 };


  // Summary: The return value of the mapStateToProp and mapDispatchToProps , will be merged to form a Prop object which will be passed to the component , then component will utilize it. Simple!

  // Create a higher-order component ready to plug into a store
  // Inversion of control
  const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps,)(Counter);

  const mapResetDispatchToProps = (dispatch : Dispatch) => ({reset: () => dispatch({type: 'RESET'})});
  // The first Paramter is provided as null, bcuz this component does not need to know when a state change is happened ,as this component has nothing to do with State
  const ResetForCounter = connect(null, mapResetDispatchToProps)(CounterForReset);

  //Use te HOC as a descendant of Provider
  function ReduxCounter() {
  return (
    
    <Provider store={store}> {/* Provider is imported from react redux, it will provide the store to ConnectedCounter*/}
      <ConnectedCounter /> {/* This is basically the Couter function , bcuz it has the same reference , almost!, so any proprs passed from here can be received on Counter Function. */}
      <ResetForCounter />
    </Provider>
  );
}



export default ReduxCounter;