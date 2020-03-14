import React from 'react';
import GreeterFunctional from './GreeterFunctional'; 
import GreeterClass from './GreeterClass'; 
import PayeesManager from './payees/PayeesManager';
import {BrowserRouter as Router ,Route,Switch ,NavLink} from 'react-router-dom';
import ReduxCounter from './demos/ReduxCounter';
import ReduxCounterToolkit from './demos/ReduxCounterToolKit';
import ReduxCounterLocalFunctional from './demos/ReduxCounterLocalFunctional';


function App() {
  return (
    
    <Router>
    {/* Comments like that, but anyways , the below anggular brackets would be used for creating fake tag. It has to be inside the single returned element */}
    <section className="section">
    <div className="container">
    <GreeterClass company="Discover"/>
    <GreeterFunctional company="Discover" location="Riverwoods"/>
    <div>
      <p>
      <NavLink to="/payees">Payees</NavLink> | 
              <NavLink to="/people">People</NavLink> | 
              <NavLink to="/redux-counter">Redux Counter</NavLink> |
              <NavLink to="/redux-counter-toolkit">Redux Counter (Toolkit)</NavLink> |
              <NavLink to="/ICan/Choose/AnyRandom/PathForThis/DosentHavetoBeRealPath">Redux CounterMinimalFunctional</NavLink>
      </p>
    </div>
    <Switch>
    <Route path="/payees">
    <PayeesManager />
    </Route>
    <Route path="/people">
    <PeopleManager />
    </Route>
    <Route path="/redux-counter">
              <ReduxCounter />
    </Route>
    <Route path="/redux-counter-toolkit">
              <ReduxCounterToolkit />
    </Route>
    <Route path="/ICan/Choose/AnyRandom/PathForThis/DosentHavetoBeRealPath" >
    <ReduxCounterLocalFunctional/>
    </Route>
    </Switch>
    </div>
    </section>
    </Router>
  );
}

const PeopleManager = () =>{

  return (
    <div>
      <h2 className="is-size-3">People Manager</h2>
    </div>
  )

};

export default App;
