import React from 'react';
import GreeterFunctional from './GreeterFunctional'; 
import GreeterClass from './GreeterClass'; 
import PayeesManager from './payees/PayeesManager';

function App() {
  return (
    
    <>
    {/* Comments like that, but anyways , the below anggular brackets would be used for creating fake tag. It has to be inside the single returned element */}
    <GreeterClass company="Discover"/>
    <GreeterFunctional company="Discover" location="Riverwoods"/>
    <PayeesManager/>
    </>
  );
}

export default App;
